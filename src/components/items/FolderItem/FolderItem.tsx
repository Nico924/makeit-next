import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Image from 'next/image';
import styleIdentifiers from './folderItem.module.scss';

const Folder = '/assets/folder.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  title: string;
  className: string;
  action: Function;
}

export interface OwnProps {}

export type FolderItemProps = StateProps & DispatchProps & OwnProps;

const FolderItem = (props: FolderItemProps) => {
  const { title, className, action } = props;

  return (
    <div className={styles('FolderItem', className)} onClick={action}>
      <Image width={82} height={68} src={Folder} alt="folder-svg" />
      {title && <TextItem path={title} />}
    </div>
  );
};

export default FolderItem;
