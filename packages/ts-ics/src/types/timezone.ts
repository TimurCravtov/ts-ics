import type {
  NonStandardValuesGeneric,
  ParseNonStandardValues,
} from "./nonStandardValues";
import type { ConvertComponentType, ParseComponentType } from "./parse";
import type { IcsTimezoneProp } from "./timezoneProp";

export type IcsTimezone<
  TNonStandardValues extends NonStandardValuesGeneric = NonStandardValuesGeneric
> = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: IcsTimezoneProp<TNonStandardValues>[];
  nonStandard?: Partial<TNonStandardValues>;
};

export type ParseTimezoneOptions<
  TNonStandardValues extends NonStandardValuesGeneric
> = {
  nonStandard?: ParseNonStandardValues<TNonStandardValues>;
};

export type ConvertTimezone<
  TNonStandardValues extends NonStandardValuesGeneric
> = ConvertComponentType<
  IcsTimezone<TNonStandardValues>,
  ParseTimezoneOptions<TNonStandardValues>
>;

export type ParseTimezone<TNonStandardValues extends NonStandardValuesGeneric> =
  ParseComponentType<
    IcsTimezone<TNonStandardValues>,
    ParseTimezoneOptions<TNonStandardValues>
  >;
