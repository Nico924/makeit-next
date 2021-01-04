import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import loadable from '@loadable/component';
import styleIdentifiers from './sharingRectangle.scss';

// Assets
import BackTriangle from './assets/triangle.svg';
import ShareFacebook from './assets/facebook.svg';
import ShareLinkedin from './assets/linkedin.svg';
import ShareInstagram from './assets/instagram.svg';

const Share = loadable.lib(() => import('react-share'));

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type SharingRectangleProps = StateProps & DispatchProps & OwnProps;

const SharingRectangle = (props: SharingRectangleProps) => {
  const { className, containerClassName, history, url } = props;

  return (
    <div className={styles('SharingRectangle')}>
      <div className={styles('share-sticky', containerClassName)}>
        <div className={styles('ShareTitle')}>
          <TextItem path="Share" />
        </div>
        <Share>
          {({ FacebookShareButton, LinkedinShareButton, InstapaperShareButton }) => (
            <>
              <FacebookShareButton className={styles('item')} url={`${url}`}>
                <div className={styles('share')}>
                  <img src={ShareFacebook} alt="share-facebook" />
                </div>
              </FacebookShareButton>
              <LinkedinShareButton className={styles('item')} url={`${url}`}>
                <div className={styles('share')}>
                  <img src={ShareLinkedin} alt="share-linkedin" />
                </div>
              </LinkedinShareButton>
              <InstapaperShareButton className={styles('item')} url={`${url}`}>
                <div className={styles('share')}>
                  <img src={ShareInstagram} alt="share-instagram" />
                </div>
              </InstapaperShareButton>
            </>
          )}
        </Share>
      </div>
    </div>
  );
};

export default SharingRectangle;
