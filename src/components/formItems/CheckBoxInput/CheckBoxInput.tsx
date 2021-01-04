import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Checkbox from 'components/formItems/Checkbox';
import styleIdentifiers from './checkBoxInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type CheckBoxInputProps = StateProps & DispatchProps & OwnProps;

interface CheckBoxInputState {}

export default class CheckBoxInput extends Component<CheckBoxInputProps, CheckBoxInputState> {
  render(): JSX {
    const { label, placeholder, ...rest } = this.props;

    return (
      <Checkbox
        label={label || placeholder}
        {...rest}
        checkedClassName={styles('checked')}
        className={styles('checkbox')}
      />
    );
  }
}
