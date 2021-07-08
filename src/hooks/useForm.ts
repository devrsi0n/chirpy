import isEqual from 'lodash/isEqual';
import * as React from 'react';

import { usePrevious } from './usePrevious';

export type UseFormOptions<T> = {
  defaultValues: Record<keyof T, $TsAny>;
};

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

export type FieldValue = {
  [key in string]: $TsAny;
};

export function useForm<T extends FieldValue>({ defaultValues }: UseFormOptions<T>) {
  const previousDefaultValues = usePrevious(defaultValues);
  const [fields, setFields] = React.useState<Record<string, string>>(defaultValues || {});
  React.useEffect(() => {
    if (!isEqual(previousDefaultValues, defaultValues)) {
      setFields(defaultValues);
    }
  }, [previousDefaultValues, defaultValues]);

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const register = React.useCallback(
    (name: string, validator?: Validator) => {
      const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
        if (validator?.required?.value) {
          if (!value) {
            setErrors((prev) => ({ ...prev, [name]: validator.required!.message }));
            return;
          } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
          }
        }
        if (validator?.pattern?.value) {
          const isValid = validator.pattern.value.test(value);
          if (!isValid) {
            setErrors((prev) => ({ ...prev, [name]: validator.pattern!.message }));
            return;
          } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
          }
        }
        if (validator?.maxLength?.value) {
          const isValid = value.length <= validator.maxLength.value;
          if (!isValid) {
            setErrors((prev) => ({ ...prev, [name]: validator.maxLength!.message }));
            return;
          } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
          }
        }
        if (validator?.minLength?.value) {
          const isValid = value.length >= validator.minLength.value;
          if (!isValid) {
            setErrors((prev) => ({ ...prev, [name]: validator.minLength!.message }));
            return;
          } else {
            setErrors((prev) => ({ ...prev, [name]: '' }));
          }
        }
      };

      return {
        onChange,
        name,
        value: fields[name],
        ...(validator?.required && { required: true }),
      };
    },
    [fields],
  );
  const handleSubmit = (onSubmit: (data: Record<string, string>) => Promise<void>) => {
    return async () => {
      await onSubmit(fields);
      setFields(defaultValues);
    };
  };

  const hasError = React.useMemo(
    () => Object.values(errors).some((val) => val.length > 0),
    [errors],
  );

  return { register, errors, handleSubmit, hasError };
}
