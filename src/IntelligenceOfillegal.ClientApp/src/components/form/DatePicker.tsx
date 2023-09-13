import React, { FC, useState } from 'react';
import cx from 'classnames';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, registerLocale } from 'react-datepicker';
import * as DateFns from 'date-fns';
import zhtw from 'date-fns/locale/zh-TW';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('zh-TW', zhtw);

export interface DatePickerProps {
  /** input id */
  id?: string;
  /** input name */
  name?: string;
  /** validation invalid */
  invalid?: boolean;
  /** class name */
  className?: string;
  /** date format, default: yyyy/MM/dd */
  format?: string;
  /** date locale, default: 'zh-TW' */
  locale?: string;
  /** input value */
  value?: string;
  /** disabled */
  disabled?: boolean;
  /** hint text, default: 年/月/日 */
  placeholder?: string;
  /** ShowTime input */
  timeInput?: boolean;
  /** autoComplete input */
  autoComplete?: boolean;
  /** 是否使用西元年 */
  isUsYear?: boolean;

  /**
   * change event
   * @argument date 當前日期
   */
  onChange?: (date: string) => void;
}

/**
 * 日期選擇元件
 * @returns DatePicker
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  className,
  invalid,
  format,
  locale,
  value,
  disabled,
  placeholder,
  timeInput,
  autoComplete,
  isUsYear,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseStringToDate(value) : null);
  const dateFormat = format || 'yyyy/MM/dd';
  const datePickerLocale = locale || 'zh-TW';
  const inputClassName = cx('form-control', className || '', {
    'is-invalid': invalid,
  });
  const placeholderText = placeholder || '年/月/日';
  const showTimeInput = timeInput || false;
  const autoCompleteSet = autoComplete ? 'on' : 'off';
  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) onChange((date && DateFns.format(date, dateFormat)) || '');
  };

  const DatePickerHeader: FC<ReactDatePickerCustomHeaderProps> = (params) => {
    return (
      <div className="custom-header">
        <div className="row">
          <div className="col-3">
            <span
              onClick={params.decreaseMonth}
              className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              style={{ cursor: 'pointer' }}
            ></span>
          </div>
          <div className="col-6">
            <span>{`${params.date.getFullYear() - 1911}年 ${params.date.toLocaleString('default', {
              month: 'long',
            })}`}</span>
          </div>
          <div className="col-3">
            <span
              onClick={params.increaseMonth}
              className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              style={{ cursor: 'pointer' }}
            ></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ReactDatePicker
      id={id}
      name={name}
      dateFormat={dateFormat}
      locale={datePickerLocale}
      selected={selectedDate}
      onChange={handleChange}
      className={inputClassName}
      value={isUsYear ? value : formatToRepublicOfChina(value)}
      placeholderText={placeholderText}
      disabled={disabled}
      showTimeInput={showTimeInput}
      autoComplete={autoCompleteSet}
      renderCustomHeader={isUsYear ? undefined : DatePickerHeader}
    />
  );
};

/**
 * string 轉 Date
 * @returns Date | null
 */
function parseStringToDate(str: string) {
  if (!str) return null;

  try {
    const dateMsec = Date.parse(str);
    const result = DateFns.toDate(dateMsec);
    return result;
  } catch (error) {
    return null;
  }
}

/**
 * string 轉 Date
 * @returns Date time string
 */
function formatToRepublicOfChina(dateString: string | undefined) {
  if (!dateString) return '';

  const parts = dateString.split('/');
  if (parts.length === 3 && parts[0].length == 4) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if (year >= 1 && year <= 9999) {
      const republicOfChinaYear = year - 1911;
      const republicOfChinaDateString = `${republicOfChinaYear}/${month}/${day}`;
      return republicOfChinaDateString;
    }
  }

  return dateString;
}
