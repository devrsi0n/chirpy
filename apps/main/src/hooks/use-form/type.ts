export type Validator = {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
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
