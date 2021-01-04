import * as React from 'react';
import classNames from 'classnames/bind';
import NumberFormat from 'react-number-format';

import styleIdentifiers from './amount.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  value: string | number;
  className: string;
}

export type AmountProps = StateProps & DispatchProps & OwnProps;

interface AmountState {}

export default class Amount extends React.Component<AmountProps, AmountState> {
  render(): JSX {
    const { value, className, ...rest } = this.props;

    return (
      <NumberFormat
        className={styles('Amount', className)}
        value={value || 0}
        displayType="text"
        prefix="€"
        suffix=""
        decimalSeparator="."
        fixedDecimalScale
        decimalScale={2}
        thousandSeparator=" "
        {...rest}
      />
    );
  }
}
