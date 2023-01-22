import { ZodError } from 'zod';

import { logger } from '../../utilities';
import { Validator } from './type';

export function validate(
  validator: Validator,
  value: string,
): string | undefined {
  let errorMessage: string | undefined;
  if (validator.required && !value) {
    errorMessage = validator.required.message;
  }
  if (validator.pattern) {
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
  if (validator.maxLength && value.length > validator.maxLength.value) {
    errorMessage = validator.maxLength.message;
  }
  if (validator.minLength && value.length < validator.minLength.value) {
    errorMessage = validator.minLength.message;
  }
  if (validator.zod) {
    try {
      validator.zod.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        errorMessage = error.issues[0].message;
      } else {
        logger.error(`Unexpected zod error`, error);
      }
    }
  }

  return errorMessage;
}
