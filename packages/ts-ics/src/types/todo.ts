import type { IcsAlarm } from './alarm';
import type { IcsAttendee } from './attendee';
import type { IcsDateObject } from './date';
import type { IcsDuration } from './duration';
import type { IcsOrganizer } from './organizer';
import type { IcsRecurrenceRule } from './recurrenceRule';
import type { IcsRecurrenceId } from './recurrenceId';
import type { IcsStatusType } from './status';
import type { IcsExceptionDates } from './exceptionDate';
import type { IcsClassType } from './class';
import type { NonStandardValuesGeneric } from './nonStandardValues';

export type IcsTodo<TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric> = {
    uid: string;
    stamp: IcsDateObject;
    summary?: string;
    description?: string;
    due?: IcsDateObject;
    duration?: IcsDuration;
    completed?: IcsDateObject;
    created?: IcsDateObject;
    lastModified?: IcsDateObject;
    priority?: number;
    status?: IcsStatusType; // e.g., 'NEEDS-ACTION', 'COMPLETED', 'IN-PROCESS', 'CANCELLED'
    organizer?: IcsOrganizer;
    attendees?: IcsAttendee[];
    categories?: string[];
    recurrenceRule?: IcsRecurrenceRule;
    exceptionDates?: IcsExceptionDates;
    recurrenceId?: IcsRecurrenceId;
    class?: IcsClassType;
    url?: string;
    geo?: string;
    sequence?: number;
    comment?: string;
    attach?: string;
    alarms?: IcsAlarm[];
    nonStandard?: Partial<TNonStandardValues>;
};