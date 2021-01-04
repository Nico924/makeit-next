import * as React from 'react';
import classNames from 'classnames/bind';
import styleIdentifiers from './phoneNumber.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  value: string;
  className: string;
}

export type PhoneNumberProps = StateProps & DispatchProps & OwnProps;

interface PhoneNumberState {}

export default class PhoneNumber extends React.Component<PhoneNumberProps, PhoneNumberState> {
  formatNumber = (value: string): string => {
    value = value || '';
    return value;
  };

  render(): JSX {
    const { value, className } = this.props;

    return <span className={styles('PhoneNumber', className)}>{this.formatNumber(value)}</span>;
  }
}
