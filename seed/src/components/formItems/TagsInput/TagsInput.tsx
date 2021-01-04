import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import FormElement, { FormElementProps } from 'components/structure/FormElement';
import FieldWrapper, { FieldWrapperProps } from 'components/structure/FieldWrapper';
import clone from 'lodash/clone';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import styleIdentifiers from './tagsInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type TagsInputProps = StateProps &
  DispatchProps &
  OwnProps &
  FormElementProps &
  FieldWrapperProps;

const TagsInput = (props: TagsInputProps) => {
  const { className, input, effect, label, textPlaceholder, id, disabled } = props;

  const inputElement = useRef(null);
  const valueElement = useRef([]);

  const handleAddTag = () => {
    const values = clone(valueElement.current);
    if (inputElement.current.value !== '') {
      values.push(inputElement.current.value);
      input.onChange(values);
      valueElement.current = values;
      inputElement.current.value = '';
    }
  };

  function detectEnterPress(e) {
    if (e.code === 'Enter') {
      handleAddTag();
      e.preventDefault();
    }
  }

  function removeValue(e) {
    const values = clone(input.value);
    const index = values.findIndex(i => i === e);
    values.splice(index, 1);
    valueElement.current = values;
    input.onChange(values);
  }

  useEffect(() => {
    if (input.value) valueElement.current = input.value;
  }, []);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.addEventListener('keypress', e => detectEnterPress(e));
    }
    return inputElement.current.removeEventListener('keypress', e => detectEnterPress(e));
  }, [inputElement]);

  return (
    <div className={styles('TagsInput')}>
      <FormElement {...props} className={styles(className)}>
        <FieldWrapper {...props} valueClassName={styles('input-value')}>
          <input
            aria-label={input && input.name}
            ref={inputElement}
            placeholder={((!effect || !label) && textPlaceholder) || ''}
            id={id}
            disabled={disabled}
          />
          <div className={styles('button')} onClick={handleAddTag}>
            <AiOutlinePlus />
          </div>
        </FieldWrapper>
      </FormElement>
      <div className={styles('tag-container')}>
        {input.value &&
          Array.isArray(input.value) &&
          input.value.map((item, key) => (
            <div key={key} className={styles('tag-item')}>
              <div>{item}</div>
              <div className={styles('icon')} onClick={() => removeValue(item)}>
                <FaTimes />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TagsInput;
