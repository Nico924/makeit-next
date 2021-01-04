import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Link } from 'react-router-dom';
import CustomButton from 'components/items/CustomButton';
import SeoHandler from 'components/global/SeoHandler';
import styleIdentifiers from './thankYouAgenda.scss';
import picto from './assets/thanks-newsletter.svg';
import thumbnail from './assets/thumbnail.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThankYouAgendaProps = StateProps & DispatchProps & OwnProps;

interface ThankYouAgendaState {}

export default class ThankYouAgenda extends Component<ThankYouAgendaProps, ThankYouAgendaState> {
  render() {
    const { history } = this.props;
    return (
      <div className={styles('ThankYouAgenda')}>
        <SeoHandler path="business-proto.thanksAgenda.seo" image={thumbnail} />
        <div className={styles('content')}>
          <img src={picto} alt="thanks-unicorn" />
          <div className={styles('text')}>
            <TextItem path="business-proto.thanksAgenda.text" isHtml />
          </div>
          <div className={styles('button-container')}>
            <CustomButton
              label="Back to homepage"
              action={() => history.push('/business-prototyping-arena')}
              color="grey"
              className={styles('button')}
            />
            <CustomButton
              label="More about Make it"
              action={() => history.push('/')}
              color="pink"
              className={styles('button')}
            />
          </div>
        </div>
      </div>
    );
  }
}
