import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { getDuration } from 'store/utils/helper';
import styleIdentifiers from './durationItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type DurationItemProps = StateProps & DispatchProps & OwnProps;

const DurationItem = (props: DurationItemProps) => {
  const { duration, ...rest } = props;

  const str = getDuration(duration, {
    ...rest,
  });

  return <span className={styles('DurationItem')}>{str}</span>;
};

export default DurationItem;
