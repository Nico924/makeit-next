import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Section from 'components/pageItems/Section';
import Flex from 'components/pageItems/Flex';
import CustomMarketingForm from 'components/enhancers/CustomMarketingForm';
import CustomButton from 'components/items/CustomButton';
import ProjectInput from 'components/formItems/ProjectInput';
import styleIdentifiers from './ideaApplicationSecondStep.scss';
import { useSelector, useDispatch } from 'react-redux';

//assets
import halfCarre from './assets/half_carre.svg';
import halfRound from './assets/half_round.svg';

const IdeaApplicationStep2Formulaire = CustomMarketingForm(ProjectInput, CustomButton);

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type IdeaApplicationSecondStepProps = StateProps & DispatchProps & OwnProps;

const IdeaApplicationSecondStep = (props: IdeaApplicationSecondStepProps) => {
  const { history } = props;
  const lg = useSelector(state => state.content.lg);
  return (
    <div className={styles('IdeaApplicationSecondStep')}>
      <img className={styles('half_carre')} src={halfCarre} alt="shape" />
      <Section classN={styles('section1')}>
        <div className={styles('container')}>
          <div className={styles('title', 'white')}>
            <TextItem path="idea application.section1.title" isHtml />
          </div>

          <div className={styles('form')}>
            <div className={styles('text', 'black')}>
              <TextItem isHtml path="idea application.part2.text" isHtml />
            </div>
            <IdeaApplicationStep2Formulaire
              onSubmit={() => history.push('/thank-you-we-invest-in-ideas-application')}
              formId="f2afbacb-7d86-48f3-896c-4decb0287a9b"
              className={styles('contact-form')}
              lg={lg}
              buttonProps={{
                label: 'Send',
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

export default withRouter(IdeaApplicationSecondStep);
