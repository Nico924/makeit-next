import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './textInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  textarea: boolean;
  star: boolean;
}

export type TextInputProps = StateProps & DispatchProps & OwnProps;

interface TextInputState {}

export default class TextInput extends Component<TextInputProps, TextInputState> {
  render(): JSX {
    const { className, star, input, textarea, ...rest } = this.props;
    const { error, touched } = this.props.meta;

    return (
      <div className={styles('TextInput', className)}>
        <div className={styles('input-wrapper')}>
          <div className={styles('input', textarea && 'textarea-input')}>
            {textarea ? (
              <textarea {...input} {...rest} />
            ) : (
              <input {...input} {...rest} type="text" />
            )}
          </div>
          {star && <span className={styles('star-required')}>*</span>}
          {error && touched && <TextItem className={styles('error')} path={error} />}
        </div>
      </div>
    );
  }
}
