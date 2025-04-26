import type { IcsAlarm } from "./alarm";
import type { IcsAttendee } from "./attendee";
import type { IcsDateObject } from "./date";
import type { IcsDuration } from "./duration";
import type { IcsOrganizer } from "./organizer";
import type { IcsRecurrenceRule } from "./recurrenceRule";
import type { IcsRecurrenceId } from "./recurrenceId";
import type { IcsStatusType } from "./status";
import type { IcsExceptionDates } from "./exceptionDate";
import type { IcsClassType } from "./class";
import type { IcsTimezone } from "./timezone";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type {
    NonStandardValuesGeneric,
    ParseNonStandardValues,
} from "./nonStandardValues";

export type IcsTodoDurationOrDue =
    | { duration: IcsDuration; due?: never }
    | { duration?: never; due: IcsDateObject };

export type IcsTodoBase<
    TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
    summary?: string; // Optional, unlike IcsEvent
    uid: string;
    created?: IcsDateObject;
    lastModified?: IcsDateObject;
    stamp: IcsDateObject;
    location?: string;
    description?: string;
    categories?: string[];
    exceptionDates?: IcsExceptionDates;
    recurrenceRule?: IcsRecurrenceRule;
    alarms?: IcsAlarm<TNonStandardValues>[];
    url?: string;
    geo?: string;
    class?: IcsClassType;
    organizer?: IcsOrganizer;
    priority?: number; // Number, unlike IcsEvent's string
    sequence?: number;
    status?: IcsStatusType; // e.g., 'NEEDS-ACTION', 'COMPLETED', 'IN-PROCESS', 'CANCELLED'
    attach?: string;
    recurrenceId?: IcsRecurrenceId;
    attendees?: IcsAttendee[];
    comment?: string;
    completed?: IcsDateObject;
    nonStandard?: Partial<TNonStandardValues>;
};

export type IcsTodo<
    TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = IcsTodoBase<TNonStandardValues> & IcsTodoDurationOrDue;

export type ParseTodoOptions<
    TNonStandardValues extends NonStandardValuesGeneric
> = {
    timezones?: IcsTimezone[];
    nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertTodo<TNonStandardValues extends NonStandardValuesGeneric> =
    ConvertComponentType<
        IcsTodo<TNonStandardValues>,
        ParseTodoOptions<TNonStandardValues>
    >;

export type ParseTodo<TNonStandardValues extends NonStandardValuesGeneric> =
    ParseComponentType<
        IcsTodo<TNonStandardValues>,
        ParseTodoOptions<TNonStandardValues>
    >;