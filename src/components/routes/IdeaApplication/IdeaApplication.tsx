import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import CustomButton from 'components/items/CustomButton';
import ProjectInput from 'components/formItems/ProjectInput';
import styleIdentifiers from './ideaApplication.scss';
import { PopupText } from 'react-calendly';
import { useSelector, useDispatch } from 'react-redux';

//assets
import halfCarre from './assets/half_carre.svg';
import halfRound from './assets/half_round.svg';
import one from './assets/badge_one.svg';
import two from './assets/badge_two.svg';
import three from './assets/badge_three.svg';
import four from './assets/badge_four.svg';

const IdeaApplicationFormulaire = CustomMarketingForm(ProjectInput, CustomButton);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type IdeaApplicationProps = StateProps & DispatchProps & OwnProps;

const IdeaApplication = (props: IdeaApplicationProps) => {
  const { history } = props;
  const lg = useSelector(state => state.content.lg);
  return (
    <div className={styles('IdeaApplication')}>
      <img className={styles('half_carre')} src={halfCarre} alt="shape" />
      <Section classN={styles('section1')}>
        <div className={styles('container')}>
          <div className={styles('title', 'white')}>
            <TextItem path="idea application.section1.title" isHtml />
          </div>
          <div className={styles('card-wrapper')}>
            <div className={styles('card')}>
              <div className={styles('card-icon')}>
                <img src={one} alt="icon" />
              </div>
              <div className={styles('card-text')}>
                <TextItem path="idea application.section1.cards.card1_text" isHtml />
              </div>
            </div>
            <div className={styles('card')}>
              <div className={styles('card-icon')}>
                <img src={two} alt="icon" />
              </div>
              <div className={styles('card-text')}>
                <TextItem path="idea application.section1.cards.card2_text" isHtml />
              </div>
            </div>
            <div className={styles('card')}>
              <div className={styles('card-icon')}>
                <img src={three} alt="icon" />
              </div>
              <div className={styles('card-text')}>
                <TextItem path="idea application.section1.cards.card3_text" isHtml />
              </div>
            </div>
            <div className={styles('card')}>
              <div className={styles('card-icon')}>
                <img src={four} alt="icon" />
              </div>
              <div className={styles('card-text')}>
                <TextItem path="idea application.section1.cards.card4_text" isHtml />
              </div>
            </div>
          </div>
          <div className={styles('text', 'second-text', 'black')}>
            <TextItem path="idea application.section1.second-text" isHtml />
          </div>

          <div className={styles('form')}>
            <div className={styles('text', 'black')}>
              <TextItem isHtml path="idea application.section1.text" isHtml />
            </div>
            <IdeaApplicationFormulaire
              onSubmit={() => history.push('/we-invest-in-ideas-application-step-2')}
              formId="ae50e0f4-dba5-40ea-88e5-3b90f243cbcb"
              className={styles('contact-form')}
              lg={lg}
              buttonProps={{
                label: 'Next Step',
                color: 'pink',
              }}
            />
          </div>
        </div>
      </Section>
      <img className={styles('half_round')} src={halfRound} alt="shape" />
    </div>
  );
};

export default IdeaApplication;
