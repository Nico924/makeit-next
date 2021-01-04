import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './tagItem.module.scss';

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
  const { categorie, className, action, indicColor } = props;
  return (
    <div className={styles('TagItem', className)} onClick={action}>
      {indicColor && <div className={styles('indic')} style={{ backgroundColor: indicColor }} />}
      <div className={styles('name')}>
        <TextItem path={categorie} />
      </div>
    </div>
  );
};

export default TagItem;
