import * as React from 'react';

import { FieldValue, Validator } from './type';
import { validate } from './validate';

export type UseFormOptions<T> = {
  defaultValues: T;
};

export type FormError<T> = {
  [key in keyof T]?: string;
};

export type ValidatorItem<
  T extends FieldValue,
  VKey extends keyof T = keyof T,
> = Map<VKey, Validator<T, VKey>>;

type RegisterResult<T, VKey extends keyof T> = T[VKey] extends string
  ? {
      name: VKey;
      value: string;
      onChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      >;
    }
  : {
      name: VKey;
      checked: boolean;
      onChange(checked: boolean): void;
    };

export function useForm<TField extends FieldValue>({
  defaultValues,
}: UseFormOptions<TField>) {
  const [fields, setFields] = React.useState<TField>(defaultValues || {});

  const [errors, setErrors] = React.useState<FormError<TField>>({});
  const validatorMapRef = React.useRef<ValidatorItem<TField>>(new Map());
  const isValid = <VKey extends keyof TField>(
    name: VKey,
    validator: Validator<TField, VKey>,
    value = fields[name],
  ): boolean => {
    const errorMessage = validate(validator, value);
    if (errorMessage !== errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    }
    return !errorMessage;
  };

  const register = <VKey extends keyof TField>(
    key: VKey,
    validator?: Validator<TField, VKey>,
  ): RegisterResult<TField, VKey> => {
    if (validator) {
      validatorMapRef.current.set(key, validator);
    }
    const handleStringChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      const { value } = e.target;
      setFields((prev) => ({ ...prev, [key]: value }));
      if (validator) {
        isValid(key, validator, value as TField[VKey]);
      }
    };
    const handleCheckboxChange = (checked: boolean): void => {
      setFields((prev) => ({ ...prev, [key]: checked }));
      if (validator) {
        isValid(key, validator, checked as TField[VKey]);
      }
    };
    return {
      name: key,
      ...(typeof fields[key] === 'string'
        ? {
            onChange: handleStringChange,
            value: fields[key],
          }
        : {
            onChange: handleCheckboxChange,
            checked: fields[key],
          }),
    } as RegisterResult<TField, VKey>;
  };

  const handleSubmit = <E>(
    onSubmit: (data: TField, event: E) => Promise<void>,
  ) => {
    const onSubmitWrapper: (e: E) => Promise<void> = async (e) => {
      for (const [name, validator] of validatorMapRef.current.entries()) {
        if (!isValid(name, validator)) {
          return;
        }
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

  const setError = (name: keyof TField, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return { register, errors, handleSubmit, hasError, setError, setFields };
}
