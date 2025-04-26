import type { IcsTodo } from "@/types";
import { invertKeys, keysFromObject } from './utils';

export type IcsTodoObjectKey = Exclude<keyof IcsTodo, 'nonStandard'>;
export type IcsTodoObjectKeys = IcsTodoObjectKey[];

export const VTODO_TO_KEYS = {
    alarms: 'ALARM',
    categories: 'CATEGORIES',
    created: 'CREATED',
    description: 'DESCRIPTION',
    lastModified: 'LAST-MODIFIED',
    geo: 'GEO',
    exceptionDates: 'EXDATE',
    recurrenceRule: 'RRULE',
    stamp: 'DTSTAMP',
    due: 'DUE',
    location: 'LOCATION',
    summary: 'SUMMARY',
    uid: 'UID',
    url: 'URL',
    duration: 'DURATION',
    completed: 'COMPLETED',
    class: 'CLASS',
    organizer: 'ORGANIZER',
    priority: 'PRIORITY',
    sequence: 'SEQUENCE',
    status: 'STATUS',
    attach: 'ATTACH',
    recurrenceId: 'RECURRENCE-ID',
    attendees: 'ATTENDEE',
    comment: 'COMMENT',
} as const satisfies Record<IcsTodoObjectKey, string>;

export const VTODO_TO_OBJECT_KEYS = invertKeys(VTODO_TO_KEYS);

export type IcsTodoKey = keyof typeof VTODO_TO_OBJECT_KEYS;
export type IcsTodoKeys = IcsTodoKey[];

export const VTODO_KEYS = keysFromObject(VTODO_TO_OBJECT_KEYS);
export const VTODO_OBJECT_KEYS = keysFromObject(VTODO_TO_KEYS);