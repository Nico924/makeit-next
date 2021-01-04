import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// Redux part
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from 'store/rootReducer';

// Import actions here

import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './thanksIdeaApplication.scss';
import Section from 'components/pageItems/Section';
import CustomButton from 'components/items/CustomButton';
import Flex from 'components/pageItems/Flex';

//assets
import thanksIllu from './assets/thanks.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksIdeaApplicationProps = StateProps & DispatchProps & OwnProps;

const ThanksIdeaApplication = (props: ThanksIdeaApplicationProps) => {
  const { history } = props;
  // mapStateToProps
  const content = useSelector((state: StoreState) => state.content.raw);
  // Allow to dispatch actions
  const dispatch = useDispatch();

  return (
    <div className={styles('thanks-idea-application')}>
      <Section classN={styles('section1')}>
        <Flex justify="j-space-between" align="a-center" classN={styles('wrapper')}>
          <div className={styles('left_wrapper')}>
            <div className={styles('title', 'white')}>
              <TextItem path="idea application.thankYouPage.title" isHtml />
            </div>
            <CustomButton
              className={styles('button', 'button_icon')}
              color="red"
              label="Back to homepage"
              id="staas-section1"
              action={(): void => history.push('/')}
            />
          </div>
          <div className={styles('right_wrapper')}>
            <img src={thanksIllu} alt="illu" />
          </div>
        </Flex>
      </Section>
    </div>
  );
};

export default ThanksIdeaApplication;
