import type { IcsTodoObjectKey } from "@/constants/keys/todo";

const timeStampKeys = ["stamp", "due", "completed", "created", "lastModified"] satisfies IcsTodoObjectKey[];

type TimeStampKey = (typeof timeStampKeys)[number];

export const objectKeyIsTimeStamp = (objectKey: IcsTodoObjectKey): objectKey is TimeStampKey =>
    timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies IcsTodoObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const objectKeyIsArrayOfStrings = (objectKey: IcsTodoObjectKey): objectKey is ArrayOfStringKey =>
    arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = ["description", "location", "summary", "geo", "url", "status"] satisfies IcsTodoObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const objectKeyIsTextString = (objectKey: IcsTodoObjectKey): objectKey is TextStringKey =>
    textStringKeys.includes(objectKey as TextStringKey);