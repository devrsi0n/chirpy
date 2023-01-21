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

export type Register = (
  name: string,
  validator?: Validator,
) => {
  required?: boolean | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  value: string;
};
