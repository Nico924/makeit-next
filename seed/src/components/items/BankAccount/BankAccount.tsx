import * as React from 'react';
import classNames from 'classnames/bind';
import { formatBankAccount } from 'store/utils/normalization';
// import styleIdentifiers from './bankAccount.scss';

const styles = classNames.bind();

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  value: string | number;
  className: string;
}

export type BankAccountProps = StateProps & DispatchProps & OwnProps;

interface BankAccountState {}

export default class BankAccount extends React.Component<BankAccountProps, BankAccountState> {
  render(): JSX {
    const { value, className } = this.props;

    return <span className={styles('BankAccount', className)}>{formatBankAccount(value)}</span>;
  }
}
