import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import SeoHandler from 'components/global/SeoHandler';
import CustomButton from 'components/items/CustomButton';
import styleIdentifiers from './thanksPageBlog.scss';

// assets
import Monkey from './assets/monkey.png';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ThanksPageBlogProps = StateProps & DispatchProps & OwnProps;

interface ThanksPageBlogState {}

export default class ThanksPageBlog extends Component<ThanksPageBlogProps, ThanksPageBlogState> {
  render(): JSX {
    const { history } = this.props;
    return (
      <div className={styles('ThanksPageBlog')}>
        <SeoHandler path="blog.thanks.seo" noIndex />
        <section className={styles('first')}>
          <div className={styles('container')}>
            <div className={styles('left-wrapper')}>
              <div className={styles('content')}>
                <div className={styles('title')}>
                  <TextItem isHtml path="blog.thanks.title" />
                </div>
                <div className={styles('subtitle')}>
                  <TextItem isHtml path="blog.thanks.subtitle" />
                </div>
                <CustomButton
                  color="pink"
                  label="blog.thanks.button"
                  className={styles('button', 'button_icon')}
                  action={(): void => history.push('/blog')}
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
