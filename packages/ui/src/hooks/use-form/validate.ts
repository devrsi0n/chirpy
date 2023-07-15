import { FieldValue, Validator } from './type';

export function validate<T extends FieldValue>(
  validator: Validator<T>,
  value: string | boolean,
): string {
  let errorMessage = '';
  if (validator.required && !value) {
    errorMessage = validator.required.message;
  }
  if (validator.pattern && typeof value === 'string') {
    if (
      typeof validator.pattern.value === 'function' &&
      !validator.pattern.value(value)
    ) {
      errorMessage = validator.pattern.message;
    }
    if (
      validator.pattern.value instanceof RegExp &&
      !validator.pattern.value.test(value)
    ) {
      errorMessage = validator.pattern.message;
    }
  }
  if (
    typeof value === 'string' &&
    validator.maxLength &&
    value.length > validator.maxLength.value
  ) {
    errorMessage = validator.maxLength.message;
  }
  if (
    typeof value === 'string' &&
    validator.minLength &&
    value.length < validator.minLength.value
  ) {
    errorMessage = validator.minLength.message;
  }

  return errorMessage;
}
