import isEqual from 'lodash/isEqual';
import * as React from 'react';

import { usePrevious } from './usePrevious';

export type UseFormOptions<T> = {
  defaultValues: Record<keyof T, $TsAny>;
};

export type Validator = {
  required?: {
    value: boolean;
    errorMessage: string;
  };
  maxLength?: {
    value: number;
    errorMessage: string;
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

  const [errors, setErrors] = React.useState<$TsAny>({});
  const register = React.useCallback(
    (name: string, validator?: Validator) => {
      const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { value } = e.target;
        if (validator?.required?.value) {
          if (!value) {
            setErrors((prev: $TsAny) => ({ ...prev, [name]: validator.required?.errorMessage }));
          } else {
            setErrors((prev: $TsAny) => ({ ...prev, [name]: '' }));
          }
        }
        setFields((prev) => ({ ...prev, [name]: value }));
      };

      return { onChange, name, value: fields[name] };
    },
    [fields],
  );
  const handleSubmit = async (onSubmit: (data: Record<string, string>) => Promise<void>) => {
    return async () => {
      await onSubmit(fields);
    };
  };

  return { register, errors, handleSubmit };
}
