import React, { useState, useEffect } from 'react';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './thanksPageSoftware.scss';
import CustomButton from 'components/items/CustomButton';

// assets
import pinkCarre from './assets/pinkCarre.svg';
import greenPoints from './assets/greenPoints.svg';
import illuStaasThanks from './assets/staasThanksSection1.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksPageSoftwareProps = StateProps & DispatchProps & OwnProps;

const ThanksPageSoftware = (props: ThanksPageSoftwareProps) => {
  const { location, history } = props;
  // mapStateToProps
  const lg = useSelector((state: StoreState) => state.content.lg);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  return (
    <div className={styles('thanks-page-software')}>
      <section className={styles('first')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <div className={styles('section_heading')}>
              <div className={styles('title', 'white')}>
                <TextItem path="software.thankYouPage.title" isHtml />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem path="software.thankYouPage.text" isHtml />
              </div>

              <CustomButton
                className={styles('button', 'button_icon')}
                action={(): void => {
                  history.push('/');
                }}
                color="red"
                label="software.thankYouPage.button"
                id="thanks-staas-section1"
              />
            </div>
          </div>
          <div className={styles('right')}>
            <img className={styles('illu_thanks')} src={illuStaasThanks} alt="Illu" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThanksPageSoftware;
