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
};
