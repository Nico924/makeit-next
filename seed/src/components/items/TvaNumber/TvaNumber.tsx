import * as React from 'react';
import classNames from 'classnames/bind';
import NumberFormat from 'react-number-format';
import styleIdentifiers from './tvaNumber.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  value: string;
  className: string;
}

export type TvaNumberProps = StateProps & DispatchProps & OwnProps;

interface TvaNumberState {}

export default class TvaNumber extends React.Component<TvaNumberProps, TvaNumberState> {
  render(): JSX {
    const { value, className } = this.props;

    return (
      <NumberFormat
        className={styles('TvaNumber', className)}
        value={value}
        displayType="text"
        format="## #### ### ### ###"
      />
    );
  }
}
