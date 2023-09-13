import React, { useEffect, useRef, useState } from 'react';
import ReactSelect from 'react-select';
import { SelectOptionConfig } from '@src/shared/types';

type ReactSelectOption = {
  /** option 用來搜尋用的值 */
  value: string;
  /** option 顯示的文字 */
  label: string;
  /** 真正的 value 值 (options[].value 值) */
  exactValue: string;
};

type SearchableSelectProps = {
  /** 下拉選單 */
  options: SelectOptionConfig[];
  /** Element id */
  id?: string;
  /** Element name */
  name?: string;
  /** value */
  value?: string;
  /** onChange 事件 */
  onChange?: (value: string) => void;
  /** onInputChange 事件 */
  onInputChange?: (value: string) => void;
  /** disabled 狀態 */
  disabled?: boolean;
  /** 輸入框提示文字 */
  placeholder?: string;
};

/**
 * 可搜尋的 Select 元件
 */
export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  onInputChange,
  disabled,
  id,
  name,
  placeholder,
}) => {
  const reactSelectRef = useRef(null);

  const [reactSelectOptions, setReactSelectOptions] = useState<ReactSelectOption[]>(
    parseOptionsToReactSelectOptions(options),
  );
  const [selectedOption, setSelectedOption] = useState((reactSelectOptions && reactSelectOptions[0]) || null);

  useEffect(() => {
    setReactSelectOptions(parseOptionsToReactSelectOptions(options));
  }, [options]);

  useEffect(() => {
    const currSelectOption = reactSelectOptions.find((opt) => opt.exactValue === value);
    if (currSelectOption) {
      setSelectedOption(currSelectOption);
    }
  }, [value, reactSelectOptions]);

  useEffect(() => {
    if (reactSelectRef.current && (reactSelectRef.current as any).inputRef) {
      (reactSelectRef.current as any).inputRef.id = `${(reactSelectRef.current as any).inputRef.id}_${id}`;
    }
  }, []);

  return (
    <>
      <ReactSelect
        ref={reactSelectRef}
        options={reactSelectOptions}
        onChange={(option) => {
          setSelectedOption(option as ReactSelectOption);

          if (onChange) {
            onChange((option && option.exactValue) || '');
          }
        }}
        value={selectedOption}
        placeholder={placeholder || ''}
        isDisabled={disabled}
        isSearchable
        onInputChange={(option) => {
          if (onInputChange) {
            onInputChange(option || '');
          }
        }}
      />
      <input
        id={id}
        name={name}
        type="text"
        style={{ display: 'none' }}
        value={(selectedOption && selectedOption.value) || ''}
        disabled
      />
    </>
  );
};

function parseOptionsToReactSelectOptions(options: SelectOptionConfig[]): ReactSelectOption[] {
  return options.map((opt) => ({
    exactValue: opt.value,
    value: opt.text,
    label: opt.text,
  }));
}
