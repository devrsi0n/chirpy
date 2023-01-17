import * as React from 'react';

import { Validator } from './type';
import { validate } from './validate';

export type UseFormOptions<T> = {
  defaultValues: T;
};

export type FieldValue = {
  [key in string]: string;
};

export type FormError<T> = {
  [key in keyof T]?: string;
};

export type ValidatorItem<T extends FieldValue> = Map<keyof T, Validator>;

export function useForm<T extends FieldValue>({
  defaultValues,
}: UseFormOptions<T>) {
  const [fields, setFields] = React.useState<T>(defaultValues || {});

  const [errors, setErrors] = React.useState<FormError<T>>({});
  const validatorMapRef = React.useRef<ValidatorItem<T>>(new Map());
  const isValid = (
    name: keyof T,
    validator: Validator,
    value: string = fields[name],
  ): boolean => {
    const errorMessage = validate(validator, value);
    if (errorMessage !== errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    }
    return !errorMessage;
  };

  const register = (name: keyof T, validator?: Validator) => {
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

      await onSubmit(fields, e);
      setFields(defaultValues);
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
