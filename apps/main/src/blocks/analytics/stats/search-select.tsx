/* eslint react/jsx-props-no-spreading: 0 */
import ChevronDownIcon from '@geist-ui/react-icons/chevronDown';
import clsx from 'clsx';
import debounce from 'debounce-promise';
import { useCombobox } from 'downshift';
import React, { useState, useCallback } from 'react';

function selectInputText(e: { target: { select: () => void } }) {
  e.target.select();
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

interface SearchSelectProps {
  fetchOptions: (query: string) => Promise<any>;
  onInput: (value: string) => void;
  onSelect: (value: any) => void;
  initialSelectedItem: any;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

export default function SearchSelect(props: SearchSelectProps) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchOptions({ inputValue, isOpen }: { inputValue: string; isOpen: boolean }) {
    setLoading(isOpen);

    return props.fetchOptions(inputValue || '').then((loadedItems) => {
      setLoading(false);
      setItems(loadedItems);
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchOptions = useCallback(debounce(fetchOptions, 200), []);

  const {
    isOpen,
    inputValue,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    closeMenu,
  } = useCombobox({
    items,
    itemToString: (item) => (item.hasOwnProperty('name') ? item.name : item),
    onInputValueChange: (changes) => {
      // @ts-ignore
      debouncedFetchOptions(changes);
      props.onInput(changes.inputValue!);
      if (changes.inputValue === '') {
        props.onSelect({ name: '', code: '' });
      }
    },
    onSelectedItemChange: (changes) => {
      props.onSelect(changes.selectedItem);
    },
    initialSelectedItem: props.initialSelectedItem,
    onIsOpenChange: (state) => {
      if (state.isOpen) {
        // @ts-ignore
        fetchOptions(state);
      }
    },
  });

  const keydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // @ts-ignore
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.isComposing || e.keyCode === 229)
      return;

    if (e.key === 'Enter' && isOpen && highlightedIndex === -1) {
      closeMenu();
      e.preventDefault();
    }
  };

  return (
    <div className="ml-2 relative w-full">
      <div
        className="relative rounded-md shadow-sm"
        {...getToggleButtonProps()}
        {...getComboboxProps()}
      >
        <input
          {...getInputProps({ onKeyDown: keydown })}
          onFocus={selectInputText}
          placeholder={props.placeholder}
          type="text"
          className={clsx(
            `w-full pr-10 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md dark:bg-gray-900 dark:text-gray-300 block`,
            inputValue === '' && !isOpen && `cursor-pointer`,
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {!loading && <ChevronDownIcon className="h-4 w-4 text-gray-500" />}
          {loading && <Spinner />}
        </div>
      </div>
      <div {...getMenuProps()}>
        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {!loading && items.length === 0 && (
              <li className="text-gray-500 select-none py-2 px-3">
                No matches found in the current dashboard. Try selecting a different time range or
                searching for something different
              </li>
            )}
            {loading && items.length === 0 && (
              <li className="text-gray-500 select-none py-2 px-3">Loading options...</li>
            )}

            {items.map((item: any, index) => (
              <li
                className={clsx(
                  `cursor-pointer select-none relative py-2 pl-3 pr-9`,
                  highlightedIndex === index
                    ? `text-white bg-indigo-600`
                    : `text-gray-900 dark:text-gray-100`,
                )}
                key={`${item.name ? item.name : item}`}
                {...getItemProps({ item, index })}
              >
                {item.name ? item.name : item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
