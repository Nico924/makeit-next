import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { FormItemLabelProps } from 'components/items/FormItemLabel';
import FormElement, { FormElementProps } from 'components/structure/FormElement';
import FieldWrapper, { FieldWrapperProps } from 'components/structure/FieldWrapper';
import { getContent } from 'store/utils/helper';
import { content as localeContent } from 'config/content';
import styleIdentifiers from './password.scss';

const styles = classNames.bind(styleIdentifiers);

interface OwnProps {
  // eventual placeholder
  placeholder?: string;
  // Show score of the password
  showScore?: boolean;
  name?: string;
  messageClassName?: string;
  messageStyle?: {};
  noDefaultIcon?: boolean;
  // messages
  pathWeak: string;
  pathGood: string;
  pathStrong: string;
  pathVeryStrong: string;
}

export type PasswordProps = FormElementProps & FieldWrapperProps & FormItemLabelProps & OwnProps;

const Password = (props: PasswordProps) => {
  const {
    // redux
    input,
    label,
    name,
    placeholder,
    effect,
    className,
    showScore,
    messageClassName,
    messageStyle,
    noDefaultIcon,
    pathWeak,
    pathGood,
    pathStrong,
    pathVeryStrong,
    pathPasswordHint,
    content,
    lg,
    meta: { touched, error },
  } = props;

  const [inputType, setInputType] = useState('password');

  const passwordElement = useRef(null);

  const textPlaceholder =
    getContent(content, placeholder, lg) ||
    getContent(localeContent, placeholder, lg) ||
    placeholder;

  const testPassword = password => {
    // Regular Expressions.
    const regex = [];
    regex.push('[A-Z]'); // Uppercase Alphabet.
    regex.push('[a-z]'); // Lowercase Alphabet.
    regex.push('[0-9]'); // Digit.
    regex.push('[$@$!%*#?&]'); // Special Character.

    let passed = 0;

    // Validate for each Regular Expression.
    for (let i = 0; i < regex.length; i += 1) {
      if (new RegExp(regex[i]).test(password)) {
        passed += 1;
      }
    }

    // Validate for length of Password.
    if (passed > 2 && password.length > 8) {
      passed += 1;
    }
    return passed;
  };

  const toggleType = () => {
    if (!input.value) return;

    if (inputType === 'text') {
      setInputType('password');
    } else {
      setInputType('text');
    }
  };

  const scorePassword = (password: string) => {
    if (!password) {
      return false;
    }

    const passed = testPassword(password);

    if (password.length === 0) {
      return false;
    }

    if (passed <= 1) {
      return (
        <div className={styles('error', messageClassName)} style={messageStyle}>
          <TextItem path={pathWeak || 'Weak'} />
        </div>
      );
    }
    if (passed <= 3) {
      return (
        <div className={styles('warning', messageClassName)} style={messageStyle}>
          <TextItem path={pathGood || 'Good'} />
        </div>
      );
    }
    if (passed === 4) {
      return (
        <div className={styles('success', messageClassName)} style={messageStyle}>
          <TextItem path={pathStrong || 'Strong'} />
        </div>
      );
    }
    return (
      <div className={styles('success', messageClassName)} style={messageStyle}>
        <TextItem path={pathVeryStrong || 'Very strong'} />
      </div>
    );
  };

  const showHint = (pathHint: string) => {
    const hintColor = touched && error ? 'error' : 'hint-color';
    return (
      <div className={styles('hint', hintColor, messageClassName)} style={messageStyle}>
        <TextItem path={pathHint} />
      </div>
    );
  };

  const iconRightName = () => {
    if (!input.value && !noDefaultIcon) return 'lock';
    if (!input.value) return '';
    if (inputType === 'password') return 'eye';
    return 'eye-slash';
  };
  return (
    <FormElement {...props} className={styles('Password', className)}>
      <FieldWrapper {...props} iconRight={iconRightName()} iconRightAction={toggleType}>
        <input
          {...input}
          aria-label={input && input.name}
          ref={passwordElement}
          type={inputType}
          name={name || input.name}
          placeholder={((!effect || !label) && textPlaceholder) || ''}
        />
      </FieldWrapper>
      {pathPasswordHint && showHint(pathPasswordHint)}
      {showScore && scorePassword(input && input.value)}
    </FormElement>
  );
};

export default Password;
