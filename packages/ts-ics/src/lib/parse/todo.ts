import {COMMA, getAlarmRegex, replaceTodoRegex} from "@/constants";
import {
    VTODO_TO_OBJECT_KEYS,
    type IcsTodoKey,
} from "@/constants/keys/todo";
import type { IcsTodo, IcsDateObject, ConvertTodo, Line } from "@/types";
import type { IcsAttendee } from "@/types/attendee";
import {
    objectKeyIsArrayOfStrings,
    objectKeyIsTextString,
    objectKeyIsTimeStamp,
} from "@/constants/keyTypes/todo";
import { convertIcsAlarm } from "./alarm";
import { convertIcsAttendee } from "./attendee";
import { convertIcsOrganizer } from "./organizer";
import { convertIcsTimeStamp } from "./timeStamp";
import { convertIcsDuration } from "./duration";
import { convertIcsRecurrenceRule } from "./recurrenceRule";
import { convertIcsExceptionDates } from "./exceptionDate";
import { convertIcsRecurrenceId } from "./recurrenceId";
import { convertIcsClass } from "./class";
import { getLine } from "./utils/line";
import { splitLines } from "./utils/splitLines";
import { unescapeTextString } from "./utils/unescapeText";
import { standardValidate } from "./utils/standardValidate";
import type { NonStandardValuesGeneric } from "@/types/nonStandardValues";
import { convertNonStandardValues } from "./nonStandardValues";
import { valueIsNonStandard } from "@/utils/nonStandardValue";

export const convertIcsTodo = <T extends NonStandardValuesGeneric>(
    ...args: Parameters<ConvertTodo<T>>
): ReturnType<ConvertTodo<T>> => {
    const [schema, rawTodoString, options] = args;

    const todoString: string = rawTodoString.replace(replaceTodoRegex, "");

    const lineStrings = splitLines(todoString.replace(getAlarmRegex, ""));

    const todo: Partial<IcsTodo> = {};

    const attendees: IcsAttendee[] = [];
    const exceptionDates: IcsDateObject[] = [];

    const nonStandardValues: Record<string, Line> = {};

    lineStrings.forEach((lineString) => {
        const { property, line } = getLine<IcsTodoKey>(lineString);

        if (valueIsNonStandard(property)) {
            nonStandardValues[property] = line;
        }

        const objectKey = VTODO_TO_OBJECT_KEYS[property];

        if (!objectKey) return;

        if (objectKeyIsTimeStamp(objectKey)) {
            todo[objectKey] = convertIcsTimeStamp(undefined, line, {
                timezones: options?.timezones,
            });
            return;
        }

        if (objectKeyIsArrayOfStrings(objectKey)) {
            todo[objectKey] = line.value.split(COMMA);
            return;
        }

        if (objectKeyIsTextString(objectKey)) {
            // @ts-ignore
            todo[objectKey] = unescapeTextString(line.value);
            return;
        }

        if (objectKey === "organizer") {
            todo[objectKey] = convertIcsOrganizer(undefined, line);
            return;
        }

        if (
            objectKey === "sequence" ||
            objectKey === "priority"
        ) {
            todo[objectKey] = Number(line.value);
            return;
        }

        if (objectKey === "attendees") {
            attendees.push(convertIcsAttendee(undefined, line));
            return;
        }

        if (objectKey === "duration") {
            todo[objectKey] = convertIcsDuration(undefined, line);
            return;
        }

        if (objectKey === "recurrenceRule") {
            todo[objectKey] = convertIcsRecurrenceRule(undefined, line, {
                timezones: options?.timezones,
            });
            return;
        }

        if (objectKey === "exceptionDates") {
            exceptionDates.push(
                ...convertIcsExceptionDates(undefined, line, {
                    timezones: options?.timezones,
                })
            );
            return;
        }

        if (objectKey === "recurrenceId") {
            todo[objectKey] = convertIcsRecurrenceId(undefined, line, {
                timezones: options?.timezones,
            });
            return;
        }

        if (objectKey === "class") {
            todo[objectKey] = convertIcsClass(undefined, line);
            return;
        }

        if (objectKey === "alarms") return;

        todo[objectKey] = line.value;
    });

    const alarmStrings = [...rawTodoString.matchAll(getAlarmRegex)].map(
        (match) => match[0]
    );

    if (alarmStrings.length > 0) {
        const alarms = alarmStrings.map((alarmString) =>
            convertIcsAlarm(undefined, alarmString, options)
        );

        todo.alarms = alarms;
    }

    if (attendees.length > 0) {
        todo.attendees = attendees;
    }

    if (exceptionDates.length > 0) {
        todo.exceptionDates = exceptionDates;
    }

    const validatedTodo = standardValidate(schema, todo as IcsTodo<T>);

    if (!options?.nonStandard) return validatedTodo;

    return convertNonStandardValues(
        validatedTodo,
        nonStandardValues,
        options?.nonStandard
    );
};