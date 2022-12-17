import * as React from 'react';

import { Register, Validator } from './type';
import { validate } from './validate';

export type UseFormOptions<T> = {
  defaultValues: T;
  /**
   * @default true
   */
  resetAfterSubmit?: boolean;
};

export type FieldValue = {
  [key in string]: string;
};

export type FormError<T> = {
  [key in keyof T]?: string;
};

export type ValidatorItem = Map<string, Validator>;

export function useForm<T extends FieldValue>({
  defaultValues,
  resetAfterSubmit = true,
}: UseFormOptions<T>) {
  const [fields, setFields] = React.useState<T>(defaultValues || {});

  const [errors, setErrors] = React.useState<FormError<T>>({});
  const validatorMapRef = React.useRef<ValidatorItem>(new Map());
  const isValid = (
    name: string,
    validator: Validator,
    value: string = fields[name],
  ): boolean => {
    const errorMessage = validate(validator, value);
    if (errorMessage !== errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    }
    return !errorMessage;
  };

  const register: Register = (name: string, validator?: Validator) => {
    if (validator) {
      validatorMapRef.current.set(name, validator);
    }
    const onChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      const { value } = e.target;
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
      for (const [name, validator] of validatorMapRef.current.entries()) {
        if (!isValid(name, validator)) {
          return;
        }
      }
      try {
        await onSubmit(fields, e);
      } catch {
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
