import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomButton from 'components/items/CustomButton';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './thanksPage.scss';

// assets
import Monkey from './assets/monkey.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksPageProps = StateProps & DispatchProps & OwnProps;

interface ThanksPageState {}

export default class ThanksPage extends Component<ThanksPageProps, ThanksPageState> {
  render(): JSX {
    const { history } = this.props;
    return (
      <div className={styles('ThanksPage')}>
        <SeoHandler path="web.thanks.seo" noIndex />
        <section className={styles('first')}>
          <div className={styles('container')}>
            <div className={styles('left-wrapper')}>
              <div className={styles('content')}>
                <div className={styles('title')}>
                  <TextItem isHtml path="web.thanks.title" isHtml />
                </div>
                <div className={styles('subtitle')}>
                  <TextItem isHtml path="web.thanks.subtitle" isHtml />
                </div>
                <CustomButton
                  color="pink"
                  label="web.thanks.button"
                  className={styles('button', 'button_icon')}
                  action={(): void => history.push('/')}
                />
              </div>
            </div>
            <div className={styles('right-wrapper')}>
              <img className={styles('illu')} alt="illu" src={Monkey} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
