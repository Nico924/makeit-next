import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styleIdentifiers from './libraryImages.scss';
import Loading from '../Loading';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type LibraryImagesProps = StateProps & DispatchProps & OwnProps;

const LibraryImages = (props: LibraryImagesProps) => {
  const { files, loadFile, onSelect } = props;

  const [selected, setSelected] = useState(null);

  function selectFile() {
    if (selected) {
      if (onSelect) onSelect(selected);
    }
  }

  useEffect(() => {
    loadFile();
  }, []);

  return (
    <div className={styles('LibraryImages')}>
      <div className={styles('title')}>
        <TextItem path="My Library" />
      </div>
      <div className={styles('container')}>
        <div className={styles('container-item')}>
          {files &&
            files.data &&
            files.data.map((item, key) => (
              <div key={key} className={styles('library-item')} onClick={() => setSelected(item)}>
                <div
                  className={styles('image')}
                  style={{ backgroundImage: `url(${item.large || item.medium || item.small})` }}
                />
                <div className={styles('label')}>
                  <TextItem path={item.title} />
                </div>
              </div>
            ))}
          {files && files.data && files.data.length === 0 && (
            <TextItem path="No image in your library" />
          )}
        </div>
        {selected && (
          <div className={styles('selected-container')}>
            <img alt={selected.title} src={selected.large} />
            <div className={styles('selected-title')}>
              <TextItem path={selected.title} />
            </div>
            <div className={styles('selected-action')}>
              <div className={styles('action-item', 'success')} onClick={() => selectFile()}>
                <FaCheckCircle />
              </div>
              <div className={styles('action-item', 'remove')} onClick={() => setSelected(null)}>
                <FaTimesCircle />
              </div>
            </div>
          </div>
        )}
        {(!files || files.loading) && (
          <div className={styles('loading-container')}>
            <Loading className={styles('loading')} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryImages;
