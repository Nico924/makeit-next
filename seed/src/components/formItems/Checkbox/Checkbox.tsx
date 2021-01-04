import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import uniqueId from 'lodash/uniqueId';
import styleIdentifiers from './checkbox.scss';

const styles = classNames.bind(styleIdentifiers);

export interface OwnProps {
  label: string;
  input?: {
    value: boolean;
  };
  isHtml?: boolean;
  children?: React.Node;
  meta: {};
  className?: string;
  star?: boolean;
  link?: Function;
  labelClassName?: string;
  checkedClassName?: string;
  small?: boolean;
  checkedColor?: string;
  noMargin?: boolean;
  disabled?: boolean;
  onRight?: boolean;
  rounded?: boolean;
  onChange: Function;
  type: 'checkbox';
}

export type CheckboxProps = OwnProps;

const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    input,
    onChange,
    isHtml,
    className,
    labelClassName,
    checkedClassName,
    checkedColor,
    star,
    link,
    noMargin,
    small,
    disabled,
    onRight,
    type,
    value,
    rounded,
    children,
    centered,
    meta: { touched, error },
  } = props;

  const handleChange = e => {
    input.onChange(e);

    if (onChange) {
      onChange(e);
    }
  };

  const getChecked = () => {
    if (input.value !== undefined && input.value !== '') return input.value;

    if (input.checked !== undefined && input.checked !== '') return input.checked;

    return false;
  };

  useEffect(() => {
    if (input.value === '') {
      input.onChange(false);
    }
  }, []);

  const id = `${input.name}-${uniqueId()}`;

  return (
    <div
      className={styles(
        'Checkbox',
        className,
        touched && error ? 'error' : false,
        small && 'small',
        checkedColor,
        noMargin && 'no-margin',
        disabled && 'disabled',
        onRight && 'right',
        centered && 'centered',
      )}
    >
      <label
        className={styles(
          labelClassName,
          'label',
          getChecked() && 'checked',
          onRight && 'right',
          rounded && 'rounded',
          getChecked() && checkedClassName,
        )}
        htmlFor={id}
      >
        <input
          aria-label={input && input.name}
          id={id}
          type="checkbox"
          {...input}
          onChange={handleChange}
          disabled={disabled}
          className={styles('input')}
          checked={getChecked()}
        />
        <div className={styles(link && 'link', disabled && 'disabled')} onClick={link}>
          {children}
          {!children && (
            <>
              <TextItem className={styles('text')} isHtml={isHtml} path={label} />
              {star && ' *'}
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
