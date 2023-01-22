import { ZodType } from 'zod';

export type ValidatorPatternChecker = (value: string) => boolean;

export type Validator = {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp | ValidatorPatternChecker;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  zod?: ZodType;
};

export type KeyOf<T extends object> = keyof T & string;

export type FieldValue = {
  [key in string]: string;
};

export type FormError<T extends FieldValue> = {
  [key in keyof T]?: string;
};

export type Register<T extends FieldValue> = (
  name: KeyOf<T>,
  validator?: Validator,
) => {
  required?: boolean | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: KeyOf<T>;
  value: string;
};
