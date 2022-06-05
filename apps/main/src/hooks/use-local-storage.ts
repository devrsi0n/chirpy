import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { isSSRMode } from '$/utilities/env';

import { useEventListener } from './use-event-listener';

type SetValue<S> = Dispatch<SetStateAction<S>>;

export function useLocalStorage<T>(
  initialValue: T,
  key?: string,
): [T | undefined, SetValue<T | undefined>, () => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    if (isSSRMode || !key) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);
  const customEventKey = `local-storage.${key}` as const;
  const setValue: SetValue<T | undefined> = (value) => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    const newValue = value instanceof Function ? value(storedValue) : value;
    if (!key) {
      setStoredValue(newValue);
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);

      window.dispatchEvent(new Event(customEventKey));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);
  useEventListener(customEventKey, handleStorageChange);

  const removeItem = () => {
    if (key) {
      window.localStorage.removeItem(key);
    }
    // eslint-disable-next-line unicorn/no-useless-undefined
    setStoredValue(undefined);
  };

  return [storedValue, setValue, removeItem];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}
