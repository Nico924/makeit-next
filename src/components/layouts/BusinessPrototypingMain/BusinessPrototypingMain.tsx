import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Main from 'components/routes/BusinessPrototyping/Main';
import ThankYou from 'components/routes/BusinessPrototyping/ThankYou';
import ThankYouAgenda from 'components/routes/BusinessPrototyping/ThankYouAgenda';
import styleIdentifiers from './businessPrototypingMain.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type BusinessPrototypingMainProps = StateProps & DispatchProps & OwnProps;

interface BusinessPrototypingMainState {}

export default class BusinessPrototypingMain extends Component<
  BusinessPrototypingMainProps,
  BusinessPrototypingMainState
> {
  render() {
    return (
      <div className={styles('BusinessPrototypingMain')}>
        <Switch>
          <Route
            path="/business-prototyping-arena/thank-you-workshop-business-prototyping"
            component={ThankYou}
          />
          <Route
            path="/business-prototyping-arena/thank-you-workshop-business-prototyping-agenda"
            component={ThankYouAgenda}
          />
          <Route component={Main} />
        </Switch>
      </div>
    );
  }
}
