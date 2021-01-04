import React, { useState, useEffect, useRef } from 'react';
import { Fade, Slide, Zoom } from 'react-reveal';
import { PopupText } from 'react-calendly';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './partners.scss';

//assets
import illuSection1 from './assets/partners_section_1.png';
import illuShape from './assets/multiply_points.svg';
import ctaPoint from './assets/multiply_points_cta.svg';
import ctaPoint2 from './assets/multiply_points_cta_2.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type PartnersProps = StateProps & DispatchProps & OwnProps;

const Partners = (props: PartnersProps) => {
  const investor = useRef();
  const incubator = useRef();
  // mapStateToProps
  const lg = useSelector((state: StoreState) => state.content.lg);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  function scrollTo(item) {
    if (item && item.current) {
      window.scrollTo({
        top: item.current.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className={styles('partners')}>
      <SeoHandler path="partners.seo" />
      <section className={styles('first')}>
        <div className={styles('container')}>
          <Fade bottom>
            <div className={styles('section_heading')}>
              <hr className={styles('line')} />
              <div className={styles('uppertitle', 'black')}>
                <TextItem path="partners.section1.uppertitle" isHtml />
              </div>
              <div className={styles('title', 'white')}>
                <TextItem path="partners.section1.title" isHtml />
              </div>
              <div className={styles('text', 'white')}>
                <TextItem path="partners.section1.text" isHtml />
              </div>
              <div className={styles('button-container')}>
                <CustomButton
                  className={styles('button', 'button_icon')}
                  action={(): void => {
                    scrollTo(investor);
                  }}
                  color="red"
                  label="partners.section1.button1"
                  id="staas-section1"
                />
                <CustomButton
                  className={styles('button', 'button_icon', 'button-2')}
                  action={(): void => {
                    scrollTo(incubator);
                  }}
                  color="red"
                  label="partners.section1.button2"
                  id="staas-section1"
                />
              </div>
            </div>
          </Fade>
          <img className={styles('Illu')} src={illuSection1} alt="Illu" />
          <img className={styles('Illu_shape')} src={illuShape} alt="Illu" />
        </div>
      </section>
      <section className={styles('second')} ref={investor}>
        <Fade bottom>
          <div className={styles('container')}>
            <div className={styles('left')}>
              <div className={styles('section_heading')}>
                <div className={styles('title')}>
                  <TextItem path="partners.section2.title" isHtml />
                </div>
                <div className={styles('text')}>
                  <TextItem path="partners.section2.text" isHtml />
                </div>
              </div>
            </div>
            <div className={styles('right')}>
              <div className={styles('cta-container')}>
                <img className={styles('cta-point')} src={ctaPoint} alt="illu" />
                <div className={styles('title', 'white')}>
                  <TextItem path="partners.section2.cta" isHtml />
                </div>
                <div className={styles('button_wrapper')}>
                  <div className={styles('button', 'btn_pink')}>
                    <PopupText
                      url="https://calendly.com/bryan-bogdanic/startup-chat-30b?month=2020-10"
                      text="Book a call"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
      <section className={styles('third')} ref={incubator}>
        <Fade bottom>
          <div className={styles('container')}>
            <div className={styles('left')}>
              <div className={styles('cta-container')}>
                <img className={styles('cta-point')} src={ctaPoint2} alt="illu" />
                <div className={styles('title', 'white')}>
                  <TextItem path="partners.section3.cta" isHtml />
                </div>
                <div className={styles('button_wrapper')}>
                  <div className={styles('button', 'btn_pink')}>
                    <PopupText
                      url="https://calendly.com/bryan-bogdanic/startup-chat-30b?month=2020-10"
                      text="Book a call"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles('right')}>
              <div className={styles('section_heading')}>
                <div className={styles('title', 'white')}>
                  <TextItem path="partners.section3.title" isHtml />
                </div>
                <div className={styles('text', 'white')}>
                  <TextItem path="partners.section3.text" isHtml />
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </div>
  );
};

export default Partners;
