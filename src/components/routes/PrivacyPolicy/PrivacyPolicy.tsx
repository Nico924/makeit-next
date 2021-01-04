import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import SeoHandler from 'components/global/SeoHandler';
import CardItem from 'components/items/CardItem';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import findIndex from 'lodash/findIndex';
import styleIdentifiers from './privacyPolicy.scss';

// assets
import points from './assets/points.svg';
import carrePink from './assets/carre_pink.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type PrivacyPolicyProps = StateProps & DispatchProps & OwnProps;

const PrivacyPolicy = (props: PrivacyPolicyProps) => {
  const { content } = props;

  const refContentContainer = useRef(null);

  const [active, setActive] = useState(0);

  function listener() {
    let scrollPosition = refContentContainer.current.getBoundingClientRect().top;
    scrollPosition -= 20;
    scrollPosition -= refContentContainer.current.offsetTop;

    if (scrollPosition >= 0) {
      setActive(0);
      return;
    }

    const index = findIndex(refContentContainer.current.children, e => {
      const height = e.offsetTop + e.offsetHeight;
      return height > Math.abs(scrollPosition);
    });

    setActive(index);
  }

  function scrollTo(index) {
    if (refContentContainer.current) {
      refContentContainer.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <div className={styles('PrivacyPolicy')}>
      <SeoHandler path="privacy.seo" />

      <div className={styles('section1')}>
        <div className={styles('contain')}>
          <div className={styles('section_heading')}>
            <hr className={styles('line')} />
            <div className={styles('title')}>
              <TextItem path="privacy.Section1.title" isHtml />
            </div>
          </div>
        </div>
        <img className={styles('points')} src={points} alt="shape" />
      </div>
      <div className={styles('container')}>
        <img className={styles('carre-pink')} src={carrePink} alt="shape" />
        <div className={styles('contain')}>
          <div className={styles('menu')}>
            <div className={styles('menu-card')}>
              <div className={styles('menu-container')}>
                <div className={styles('title-container')}>
                  <h2>
                    <TextItem path="Table of contents" isHtml />
                  </h2>
                </div>
                {content &&
                  Object.keys(content).map((item, key) => (
                    <div
                      className={styles('title-container', active === key && 'active')}
                      key={key}
                      onClick={() => scrollTo(key)}
                    >
                      <div className={styles('indicator')} />
                      <div className={styles('title')}>
                        <TextItem path={`privacy.text.${item}.title`} isHtml />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles('content')} ref={refContentContainer}>
            {content &&
              Object.keys(content).map((item, key) => (
                <div className={styles('content-item')} key={key}>
                  <div className={styles('title')}>
                    <TextItem path={`privacy.text.${item}.title`} isHtml />
                  </div>
                  <div className={styles('text')}>
                    <TextItem isHtml path={`privacy.text.${item}.text`} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
