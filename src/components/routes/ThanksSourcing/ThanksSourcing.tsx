import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import Section from 'components/pageItems/Section';
import styleIdentifiers from './thanksSourcing.scss';

// assets
import illuThanks from './assets/illuThanksSourcing.png';
// import greenPoint from './assets/multiplyGreenPoint.svg';
// import pinkCarre from './assets/pinkCarre.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksSourcingProps = StateProps & DispatchProps & OwnProps;

const ThanksSourcing = (props: ThanksSourcingProps) => {
  // Link Calendly
  const extern =
    'https://calendly.com/bryan-bogdanic/startup-chat-30?text_color=22a1e6&primary_color=aa6ca0&month=2020-05';

  const { location } = props;

  return (
    <div className={styles('ThanksSourcing')}>
      <Section classN={styles('section1')}>
        <div className={styles('container')}>
          <div className={styles('left')}>
            <div className={styles('section_heading')}>
              <div className={styles('title', 'white')}>
                <TextItem path="sourcing.thanksPage.title" isHtml />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem
                  path="sourcing.thanksPage.text"
                  replace={{
                    favoriteDrink:
                      (location && location.state && location.state.favoriteDrink) || 'unknown',
                  }}
                  isHtml
                />
              </div>
              <a href={extern} target="_blank" rel="noopener noreferrer">
                <CustomButton
                  className={styles('button', 'button_icon')}
                  action={(): void => {
                    // this.secondSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  color="red"
                  label="sourcing.thanksPage.button"
                  id="thanks-staas-section1"
                />
              </a>
            </div>
          </div>
          <div className={styles('right')}>
            <img className={styles('illu_thanks')} src={illuThanks} alt="Illu" />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ThanksSourcing;
