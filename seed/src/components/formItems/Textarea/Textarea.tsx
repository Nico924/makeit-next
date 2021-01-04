import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';

import FormElement from 'components/structure/FormElement';
import FieldWrapper from 'components/structure/FieldWrapper';
import { content as localeContent } from 'config/content';
import { getContent } from 'store/utils/helper';
import styleIdentifiers from './textarea.scss';

const styles = classNames.bind(styleIdentifiers);

interface OwnProps {
  name?: string;
  type?: string;
  autoFocus: boolean;
  noDebounce: boolean;
  autoComplete: string;
  onFocus?: Function;
  rows?: number;
  // TO IMPLEMENT
  oneLine?: boolean;
  placeholder?: string;
  size?: string;
  hideError?: boolean;
  id?: string;
}
export type TextareaProps = FormElementProps & FieldWrapperProps & FormItemLabelProps & OwnProps;

interface TextareaState {}

export const Textarea = (props: TextareaProps) => {
  const {
    resize,
    autoResize,
    name,
    input,
    rows,
    oneLine,
    placeholder,
    disabled,
    className,
    effect,
    id,
    content,
    lg,
  } = props;

  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    if (autoResize) {
      inputRef.current.style.minHeight = `${inputRef.current.clientHeight}px`;
      // if already some value
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputRef, input.value]);

  const handleInputFocus = (event: Event) => {
    const { onFocus } = props;

    input.onFocus(event);

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleChange = e => {
    const { onChange } = props;

    input.onChange(e);

    if (autoResize) {
      inputRef.current.style.height = 0;
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }

    if (onChange) {
      onChange(e);
    }
  };

  const textPlaceholder =
    getContent(content, placeholder, lg) ||
    getContent(localeContent, placeholder, lg) ||
    placeholder;

  return (
    <FormElement {...props} className={styles('Textarea', className, oneLine && 'one-line')}>
      <FieldWrapper {...props}>
        <textarea
          style={{
            maxHeight: `${autoResize}px`,
          }}
          className={styles(resize && 'resize', autoResize && 'auto-resize')}
          ref={inputRef}
          id={id}
          disabled={disabled}
          rows={rows || (autoResize ? 1 : 3)}
          name={name || input.name}
          placeholder={(!effect && textPlaceholder) || ''}
          {...input}
          onFocus={handleInputFocus}
          onChange={handleChange}
        />
      </FieldWrapper>
    </FormElement>
  );
};

export default Textarea;
