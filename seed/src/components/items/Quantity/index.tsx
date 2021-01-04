import React, { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styleIdentifiers from './quantity.scss';

const styles = classNames.bind(styleIdentifiers);

export interface Quantity {
  prefixClassName?: string;
  suffixClassName?: string;
  value: number;
  suffix?: string;
  prefiex?: string;
  fixed?: integer;
}

const Quantity = (props: QuantityProps) => {
  const { className, fixed, prefix, suffix, value, suffixClassName, prefixClassName } = props;
  const val = value || 0;

  const fixedNumber = fixed !== undefined ? fixed : 2;

  return (
    <span className={styles('quantity', className)}>
      <span className={styles('prefix', prefixClassName)}>{prefix}</span>
      <span>{val.toFixed(fixedNumber)}</span>
      <span className={styles('suffix', suffixClassName)}>{suffix || '€'}</span>
    </span>
  );
};

export default Quantity;
