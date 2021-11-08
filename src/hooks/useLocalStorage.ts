import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useEventListener } from './useEventListener';

type SetValue<S> = Dispatch<SetStateAction<S>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T | undefined, SetValue<T | undefined>, () => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
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
  const customEventKey = `local-storage.${key}`;
  const setValue: SetValue<T | undefined> = value => {
    if (typeof window == 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
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
    window.localStorage.removeItem(key);
    setStoredValue(undefined);
  };

  return [storedValue, setValue, removeItem];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    console.log('parsing error on', { value });
    return undefined;
  }
}
