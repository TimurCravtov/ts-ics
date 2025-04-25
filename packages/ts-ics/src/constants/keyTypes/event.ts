import type { IcsEventObjectKey } from "@/constants/keys/event";
import {IcsTodoObjectKey} from "@/constants/keys/todo";

const timeStampKeys = [
  "stamp",
  "start",
  "end",
  "created",
  "lastModified",
  "due",
] satisfies (IcsEventObjectKey | IcsTodoObjectKey)[];


type TimeStampKey = (typeof timeStampKeys)[number];

export const objectKeyIsTimeStamp = (
  objectKey: IcsEventObjectKey | IcsTodoObjectKey
): objectKey is TimeStampKey =>
  timeStampKeys.includes(objectKey as TimeStampKey);

const arrayOfStringKeys = ["categories"] satisfies IcsEventObjectKey[];

type ArrayOfStringKey = (typeof arrayOfStringKeys)[number];

export const objectKeyIsArrayOfStrings = (
  objectKey: IcsEventObjectKey | IcsTodoObjectKey
): objectKey is ArrayOfStringKey =>
  arrayOfStringKeys.includes(objectKey as ArrayOfStringKey);

const textStringKeys = [
  "description",
  "location",
  "comment",
  "summary",
] satisfies IcsEventObjectKey[];

type TextStringKey = (typeof textStringKeys)[number];

export const objectKeyIsTextString = (
  objectKey: IcsEventObjectKey | IcsTodoObjectKey
): objectKey is TextStringKey =>
  textStringKeys.includes(objectKey as TextStringKey);
