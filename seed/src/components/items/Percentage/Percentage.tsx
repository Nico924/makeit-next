import * as React from 'react';
import classNames from 'classnames/bind';
import { formatPercent } from 'store/utils/normalization';
import styleIdentifiers from './percentage.scss';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  value: number | string;
  className: string;
}

export type PercentageProps = StateProps & DispatchProps & OwnProps;

interface PercentageState {}

export default class Percentage extends React.Component<PercentageProps, PercentageState> {
  render(): JSX {
    const { value, className, decimal } = this.props;

    const val = formatPercent(value, decimal || 0);
    return <span className={className}>{val}</span>;
  }
}
