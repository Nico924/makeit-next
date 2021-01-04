import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Job from 'components/routes/Job/Job';
import JobIndividual from 'components/routes/Job/JobIndividual';
import JobThanksPage from 'components/routes/Job/JobThanksPage';
import styleIdentifiers from './jobMain.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type JobMainProps = StateProps & DispatchProps & OwnProps;

const JobMain = (props: JobMainProps) => {
  return (
    <div className={styles('JobMain')}>
      <Switch>
        <Route path="/jobs/thank-you-jobs" component={JobThanksPage} />
        <Route path="/jobs/:id" component={JobIndividual} />
        <Route component={Job} />
      </Switch>
    </div>
  );
};

export default JobMain;
