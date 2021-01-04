import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import styleIdentifiers from './thanksPageStaas.scss';

// assets
import pinkCarre from './assets/pinkCarre.svg';
import greenPoints from './assets/greenPoints.svg';
import illuStaasThanks from './assets/staasThanksSection1.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksPageStaasProps = StateProps & DispatchProps & OwnProps;

const ThanksPageStaas = (props: ThanksPageStaasProps) => {
  const { location, history } = props;

  return (
    <div className={styles('thanksStaas')}>
      <section className={styles('first')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <div className={styles('section_heading')}>
              <div className={styles('title', 'white')}>
                <TextItem path="staas.thankYouPage.title" isHtml />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem path="staas.thankYouPage.text" isHtml />
              </div>

              <CustomButton
                className={styles('button', 'button_icon')}
                action={(): void => {
                  history.push('/');
                }}
                color="red"
                label="staas.thankYouPage.button"
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

export default ThanksPageStaas;
