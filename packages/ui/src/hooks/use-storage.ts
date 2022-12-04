import { isSSRMode } from '@chirpy-dev/utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { logger } from '../utilities/logger';
import { useEventListener } from './use-event-listener';

type SetValue<S> = Dispatch<SetStateAction<S>>;

export function useLocalStorage<T>(
  initialValue: T,
  key?: string,
): [T | undefined, SetValue<T | undefined>, () => void] {
  return useStorage(() => localStorage, initialValue, key);
}

export function useSessionStorage<T>(
  initialValue: T,
  key?: string,
): [T | undefined, SetValue<T | undefined>, () => void] {
  return useStorage(() => sessionStorage, initialValue, key);
}

function useStorage<T>(
  getStorage: () => Storage,
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
      const item = getStorage().getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      logger.warn(`Error reading storage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);
  const customEventKey = `local-storage.${key}` as const;
  const setValue: SetValue<T | undefined> = (value) => {
    if (typeof window == 'undefined') {
      logger.warn(
        `Tried setting storage key “${key}” even though environment is not a client`,
      );
    }

    const newValue = value instanceof Function ? value(storedValue) : value;
    if (!key) {
      setStoredValue(newValue);
      return;
    }

    try {
      getStorage().setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);

      window.dispatchEvent(new Event(customEventKey));
    } catch (error) {
      logger.warn(`Error setting storage key “${key}”:`, error);
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
      getStorage().removeItem(key);
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
    logger.warn('parsing error on', { value });
    return undefined;
  }
}
