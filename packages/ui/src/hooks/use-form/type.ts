export type ValidatorPatternChecker = (value: string) => boolean;

export type FieldValue = {
  [key in string]: string | boolean;
};

export type Validator<TField extends FieldValue, VKey extends keyof TField> = {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: TField[VKey] extends string
    ? {
        value: RegExp | ValidatorPatternChecker;
        message: string;
      }
    : never;
  maxLength?: TField[VKey] extends string
    ? {
        value: number;
        message: string;
      }
    : never;
  minLength?: TField[VKey] extends string
    ? {
        value: number;
        message: string;
      }
    : never;
};
