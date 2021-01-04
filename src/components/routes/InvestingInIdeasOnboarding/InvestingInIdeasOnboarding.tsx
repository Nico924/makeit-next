import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Illustration from 'components/items/Illustration';
import SeoHandler from 'components/global/SeoHandler';
import { Form } from 'react-final-form';
import PartnerLogo from 'components/pageItems/PartnerLogo/PartnerLogo';
import InvestIllustration from 'components/pageItems/InvestIllustration';
import InvestHeader from 'components/pageItems/InvestHeader';
import ProfileForm from 'components/forms/ProfileForm';
import styleIdentifiers from './investingInIdeasOnboarding.scss';

// Assets
import Rectangle from './assets/rectangle.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type InvestingInIdeasOnboardingProps = StateProps & DispatchProps & OwnProps;

const InvestingInIdeasOnboarding = (props: InvestingInIdeasOnboardingProps) => {
  const { setProfile, history } = props;
  function handleSubmit(val) {
    setProfile({
      data: { ...val, campaign: 'USA-Starwars', how: 'other' },
      callback: () => history.push('/investinideas'),
    });
  }

  return (
    <div className={styles('InvestingInIdeasOnboarding')}>
      <SeoHandler path="investinideasus.Onboarding.seo" />
      <InvestHeader />
      <InvestIllustration className={styles('illu')} style={{ top: '15%', right: '42%' }} />
      <InvestIllustration className={styles('illu')} style={{ left: '40%' }} illu="star-four" />
      <InvestIllustration
        className={styles('illu')}
        style={{ top: 0, right: '30%', width: '20px' }}
        illu="star-four"
      />
      <InvestIllustration
        className={styles('illu')}
        style={{ top: '25%', left: '30%' }}
        illu="square"
      />
      <InvestIllustration
        className={styles('illu')}
        style={{ right: '5%', top: '40%' }}
        illu="polygon"
      />
      <div className={styles('content')}>
        <div className={styles('container')}>
          <div className={styles('col')}>
            <div className={styles('title')}>
              <TextItem path="investinideasus.Onboarding.title" />
            </div>
            <div className={styles('sub')}>
              <div className={styles('by')}>
                <img src={Rectangle} alt="rectangle" />
                <TextItem path="investinideasus.Onboarding.by" />
                <img src={Rectangle} alt="rectangle" />
              </div>
              <div className={styles('buttons')}>
                <PartnerLogo partner="makeit" className={styles('button')} />
              </div>
              <div className={styles('text')}>
                <TextItem path="investinideasus.Onboarding.info" />
              </div>
            </div>
          </div>
          <div className={styles('col')}>
            <div className={styles('form')}>
              <Form onSubmit={handleSubmit} component={ProfileForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestingInIdeasOnboarding;
