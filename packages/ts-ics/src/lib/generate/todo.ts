import { VTODO_TO_KEYS } from "@/constants/keys/todo";
import {
    objectKeyIsArrayOfStrings,
    objectKeyIsTextString,
    objectKeyIsTimeStamp,
} from "@/constants/keyTypes";
import type {IcsTodo, IcsTimezone, IcsDateObject, IcsOrganizer} from "@/types";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { generateIcsAlarm } from "./alarm";
import { generateIcsAttendee } from "./attendee";
import { generateIcsOrganizer } from "./organizer";
import { generateIcsTimeStamp } from "./timeStamp";
import {
    generateIcsLine,
    getIcsEndLine,
    getIcsStartLine,
} from "./utils/addLine";
import { getKeys } from "./utils/getKeys";
import { formatLines } from "./utils/formatLines";
import { escapeTextString } from "./utils/escapeText";
import { generateNonStandardValues } from "./nonStandardValues";
import type {
    GenerateNonStandardValues,
} from "@/types/nonStandardValues";

type GenerateIcsTodoOptions<T extends NonStandardValuesGeneric> = {
    skipFormatLines?: boolean;
    nonStandard?: GenerateNonStandardValues<T>;
    timezones?: IcsTimezone[];
};

export const generateIcsTodo = <T extends NonStandardValuesGeneric>(
    todo: IcsTodo,
    options?: GenerateIcsTodoOptions<T>
) => {
    const todoKeys = getKeys(todo);
    let icsString = "";

    icsString += getIcsStartLine("VTODO");

    todoKeys.forEach((key) => {
        if (key === "alarms" || key === "attendees") return;

        if (key === "nonStandard") {
            icsString += generateNonStandardValues(todo[key], options?.nonStandard);
            return;
        }

        const icsKey = VTODO_TO_KEYS[key];

        if (!icsKey) return;

        const value = todo[key];

        if (value === undefined || value === null) return;

        if (objectKeyIsTimeStamp(key)) {
            icsString += generateIcsTimeStamp(
                icsKey,
                value as IcsDateObject,
                undefined,
                { timezones: options?.timezones, forceUtc: key === "stamp" }
            );
            return;
        }

        if (objectKeyIsArrayOfStrings(key)) {
            icsString += generateIcsLine(icsKey, (value as string[]).join(","));
            return;
        }

        if (objectKeyIsTextString(key)) {
            icsString += generateIcsLine(icsKey, escapeTextString(value as string));
            return;
        }

        // @ts-ignore
        if (key === "due") {
            icsString += generateIcsTimeStamp("due", todo[key]);
            return;
        }
        if (key === "organizer") {
            icsString += generateIcsOrganizer(value as IcsOrganizer);
            return;
        }

        // @ts-ignore
        if (key === "sequence" || key === "priority" || key === "percent") {
            icsString += generateIcsLine(icsKey, (value as number).toString());
            return;
        }

        icsString += generateIcsLine(icsKey, String(value));
    });

    if (todo.alarms && todo.alarms.length > 0) {
        todo.alarms.forEach((alarm) => {
            icsString += generateIcsAlarm(alarm, {
                nonStandard: options?.nonStandard,
            });
        });
    }

    if (todo.attendees && todo.attendees.length > 0) {
        todo.attendees.forEach((attendee) => {
            icsString += generateIcsAttendee(attendee, "ATTENDEE");
        });
    }

    icsString += getIcsEndLine("VTODO");

    if (options?.skipFormatLines) return icsString;

    return formatLines(icsString);
};