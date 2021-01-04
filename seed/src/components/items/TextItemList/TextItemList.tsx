import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { getContentList } from 'store/utils/helper';
import styleIdentifiers from './textItemList.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type TextItemListProps = StateProps & DispatchProps & OwnProps;

const TextItemList = (props: TextItemListProps) => {
  const { content, lg, items, path } = props;

  const list = [];
  items.forEach(item => {
    const text = getContentList(content, path, item, lg);

    if (text) {
      list.push(text);
    }
  });

  return list.map((elem, key) => (
    <span key={key}>
      {elem}
      {list.length > 1 && key < list.length - 1 && ', '}
    </span>
  ));
};

export default TextItemList;
