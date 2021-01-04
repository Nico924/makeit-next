import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './tagItemStatic.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  categorie: string;
  className: string;
  action: Function;
  list: string;
}

export type TagItemProps = StateProps & DispatchProps & OwnProps;

const TagItem = (props: TagItemProps) => {
  const { word, className, buttonColor } = props;
  return (
    <div className={styles('TagItem', className)}>
      <div className={styles('indic')} style={{ backgroundColor: buttonColor }} />
      <div className={styles('name')}>
        <TextItem path={word} />
      </div>
    </div>
  );
};

export default TagItem;
