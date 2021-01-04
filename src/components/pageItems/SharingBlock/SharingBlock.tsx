import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import loadable from '@loadable/component';
import styleIdentifiers from './sharingBlock.scss';

// Assets
import BackTriangle from './assets/triangle.svg';
import ShareFacebook from './assets/facebook.svg';
import ShareLinkedin from './assets/linkedin.svg';

const Share = loadable.lib(() => import('react-share'));

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SharingBlockProps = StateProps & DispatchProps & OwnProps;

const SharingBlock = (props: SharingBlockProps) => {
  const { className, containerClassName, history, url, back, noBack } = props;

  console.log('url', url);
  return (
    <div className={styles('SharingBlock', className)}>
      <div className={styles('share-sticky', containerClassName)}>
        {!noBack && (
          <div className={styles('item')} onClick={() => history.push(back || '')}>
            <div className={styles('back')}>
              <img src={BackTriangle} alt="triangle" />
            </div>
            <div className={styles('text')}>
              <TextItem path="Back" />
            </div>
          </div>
        )}
        <Share>
          {({ FacebookShareButton, LinkedinShareButton }) => (
            <>
              <FacebookShareButton className={styles('item')} url={`${url}`}>
                <div className={styles('share')}>
                  <img src={ShareFacebook} alt="share-facebook" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="Share" />
                </div>
              </FacebookShareButton>
              <LinkedinShareButton className={styles('item')} url={`${url}`}>
                <div className={styles('share')}>
                  <img src={ShareLinkedin} alt="share-linkedin" />
                </div>
                <div className={styles('text')}>
                  <TextItem path="Share" />
                </div>
              </LinkedinShareButton>
            </>
          )}
        </Share>
      </div>
    </div>
  );
};

export default SharingBlock;
