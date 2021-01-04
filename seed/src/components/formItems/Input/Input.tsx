import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import moment from 'moment';
import { FormItemLabelProps } from 'components/items/FormItemLabel';
import FormElement, { FormElementProps } from 'components/structure/FormElement';
import FieldWrapper, { FieldWrapperProps } from 'components/structure/FieldWrapper';
import { getContent } from 'store/utils/helper';
import { content as localeContent } from 'config/content';
import { FaTimesCircle } from 'react-icons/fa';
import styleIdentifiers from './input.scss';

const styles = classNames.bind(styleIdentifiers);

interface OwnProps {
  // eventual placeholder
  placeholder?: string;
  size?: string;
  name?: string;
  step?: string;
  type?: string;
  max?: string;
  min?: string;
  pattern?: string;
  onFocus?: Function;
  onChange?: Function;
  onKeyDown?: Function;
  onBlur?: Function;
  autocomplete?: string;
  id?: string;
  // payload to send
  apiPayload?: {};
  // api to load the data related
  loadApi?: Function;
  // key in the resultOwnProps
  dataKey?: string;
  beforeInputText?: string;
  beforeInputTextClassName?: string;
}

export type InputProps = FormElementProps & FieldWrapperProps & FormItemLabelProps & OwnProps;

const Input = (props: InputProps) => {
  const inputElement = useRef(null);

  const {
    input,
    label,
    type,
    inputType,
    name,
    pattern,
    min,
    max,
    step,
    autocomplete,
    placeholder,
    id,
    disabled,
    effect,
    className,
    // methods
    onKeyDown,
    onChange,
    onFocus,
    onBlur,
    clear,
    search,
    autoFocus,
    beforeInputText,
    beforeInputTextClassName,
    initialValue,
    withPlaceholder,
    //
    content,
    lg,
  } = props;

  const textPlaceholder =
    getContent(content, placeholder, lg) ||
    getContent(localeContent, placeholder, lg) ||
    placeholder;

  useEffect(() => {
    if (initialValue && !input.value) {
      input.onChange(initialValue);
    }
    if (type === 'datetime-local') {
      const value = input.value;
      if (value) {
        input.onChange(moment.utc(value).format('YYYY-MM-DDTHH:mm'));
      }
    }
  }, []);

  useEffect(() => {
    if (autoFocus) inputElement.current.focus();
  }, [inputElement]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleChange = (event: Event) => {
    if (input && input.onChange) input.onChange(event);

    const value = inputElement.current.value;

    if (onChange) {
      onChange(value);
    }
  };

  const handleBlur = (event: Event) => {
    if (input && input.onBlur) input.onBlur(event);

    if (onBlur) {
      onBlur(event, inputElement);
    }
  };

  const handleFocus = (event: Event) => {
    if (input && input.onFocus) input.onFocus(event);

    if (onFocus) {
      onFocus(event, inputElement);
    }
  };

  const handleClear = () => {
    if (input && input.onChange) input.onChange('');

    if (onChange) {
      onChange('');
    }
  };

  return (
    <FormElement {...props} className={styles('Input', className)}>
      <FieldWrapper {...props}>
        {beforeInputText && (
          <div className={styles('before-input', beforeInputTextClassName)}>
            <TextItem path={beforeInputText} />
          </div>
        )}
        <input
          {...input}
          aria-label={input && input.name}
          ref={inputElement}
          type={inputType || type || 'text'}
          name={name || (input && input.name)}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          placeholder={((!effect || !label || withPlaceholder) && textPlaceholder) || ''}
          autoComplete={autocomplete}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          id={id}
          disabled={disabled}
        />
        {(clear || search) && input.value && (
          <div className={styles('clear')} onClick={handleClear}>
            <FaTimesCircle />
          </div>
        )}
      </FieldWrapper>
    </FormElement>
  );
};

export default Input;
