import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import CardItem from 'components/items/CardItem';

import styleIdentifiers from './page404.scss';

// assets
import number from './assets/404.svg';
import cloud from './assets/cloud.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type Page404Props = StateProps & DispatchProps & OwnProps;

const Page404 = (props: Page404Props) => {
  return (
    <div className={styles('Page404')}>
      <div className={styles('content')}>
        <div className={styles('top')}>
          <CardItem noLine noPadding className={styles('card', 'one')}>
            <img className={styles('cloud')} src={cloud} alt="background" />
          </CardItem>
          <div className={styles('number')}>
            <img src={number} alt="404" />
          </div>
          <CardItem
            titleClassName={styles('title')}
            title="Error 404"
            noLine
            className={styles('card', 'two')}
          >
            <TextItem
              className={styles('text')}
              path="Oh no! There has been an error. <br/> The page you have requested cannot be found."
              isHtml
            />
          </CardItem>
        </div>
        <CustomButton
          action={() => props.history.push('/')}
          className={styles('button')}
          label="Back to Homepage"
          color="grey"
        />
      </div>
    </div>
  );
};

export default Page404;
