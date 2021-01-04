import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Dropdown from 'components/structure/Dropdown';
import styleIdentifiers from './simpleTooltip.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SimpleTooltipProps = StateProps & DispatchProps & OwnProps;

const SimpleTooltip = (props: SimpleTooltipProps) => {
  const { className, centered, contentClassName, content, path, item, direction, children } = props;

  return (
    <Dropdown
      {...props}
      className={styles('SimpleTooltip', className)}
      item={children}
      noArrow
      center
      direction={direction}
      contentClassName={styles('content', centered && 'centered', contentClassName)}
      hover
    >
      {!content ? <TextItem path={path} item={item} /> : content}
    </Dropdown>
  );
};

export default SimpleTooltip;
