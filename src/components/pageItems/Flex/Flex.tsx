import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './flex.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type FlexProps = StateProps & DispatchProps & OwnProps;

const Flex = (props: FlexProps) => {
  const { children, justify, align, classN } = props;
  return <div className={styles('Flex', align, justify, classN)}>{children}</div>;
};

export default Flex;
