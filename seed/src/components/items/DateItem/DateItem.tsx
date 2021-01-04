import * as React from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/nl';

import config from 'config/general';

const styles = classNames.bind();

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  date: string;
  readFormat: string;
  format: string;
  lg: string;
  specialClass: string;
  className: string;
}

export type DateItemProps = StateProps & DispatchProps & OwnProps;

interface DateItemState {}

export default class DateItem extends React.Component<DateItemProps, DateItemState> {
  render(): JSX {
    const { date, readFormat, format, lg, className, specialClass } = this.props;

    return (
      <span className={styles('DateItem', className, specialClass)}>
        {date &&
          moment(date, readFormat)
            .locale(lg || config.defaultLanguage)
            .format(format || 'DD/MM/YYYY')}
      </span>
    );
  }
}
