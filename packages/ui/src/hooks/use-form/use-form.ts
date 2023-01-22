import * as React from 'react';
import { ZodError } from 'zod';

import { useToast } from '../../components';
import { FieldValue, FormError, KeyOf, Register, Validator } from './type';
import { validate } from './validate';

export type UseFormOptions<T> = {
  defaultValues: T;
  /**
   * @default true
   */
  resetAfterSubmit?: boolean;
};

export type ValidatorItem<T extends FieldValue> = Map<KeyOf<T>, Validator>;

export function useForm<T extends FieldValue>({
  defaultValues,
  resetAfterSubmit = true,
}: UseFormOptions<T>) {
  const [fields, setFields] = React.useState<T>(defaultValues || {});

  const [errors, setErrors] = React.useState<FormError<T>>({});
  const validatorMapRef = React.useRef<ValidatorItem<T>>(new Map());
  const isValid = (
    name: KeyOf<T>,
    validator: Validator,
    value: string = fields[name],
  ): boolean => {
    const errorMessage = validate(validator, value);
    if (errorMessage !== errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    }
    return !errorMessage;
  };

  const register: Register<T> = (name: KeyOf<T>, validator?: Validator) => {
    if (validator) {
      validatorMapRef.current.set(name, validator);
    }
    const onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    ) => void = (e) => {
      const value = typeof e === 'string' ? e : e.target.value;
      setFields((prev) => ({ ...prev, [name]: value }));
      if (validator) {
        isValid(name, validator, value);
      }
    };
    return {
      onChange,
      name,
      value: fields[name],
      ...(validator?.required && { required: true }),
    };
  };
  const { showToast } = useToast();
  const handleSubmit = <E>(onSubmit: (data: T, event: E) => Promise<void>) => {
    const onSubmitWrapper: (e: E) => Promise<void> = async (e) => {
      const formErrors: FormError<T> = {};
      for (const [name, validator] of validatorMapRef.current.entries()) {
        const errorMessage = validate(validator, fields[name]);
        if (errorMessage !== errors[name]) {
          formErrors[name] = errorMessage;
        }
      }

      // Show all errors at once
      if (Object.keys(formErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...formErrors }));
        return;
      }

      try {
        await onSubmit(fields, e);
      } catch (error) {
        if (error instanceof ZodError) {
          showToast({
            type: 'error',
            title: 'Validation error',
            description: error.issues[0].message,
            persistent: true,
          });
        }
        // Don't throw error to the surface
        // just prevent from resetting fields
        return;
      }
      if (resetAfterSubmit) {
        setFields(defaultValues);
      }
    };
    return onSubmitWrapper;
  };

  const hasError = React.useMemo(
    () => Object.values(errors).some((val) => (val?.length || 0) > 0),
    [errors],
  );

  const setError = (name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return { register, errors, handleSubmit, hasError, setError, setFields };
}
