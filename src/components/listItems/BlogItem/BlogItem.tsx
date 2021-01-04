import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { dom } from 'config/general';
import styleIdentifiers from './blogItem.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type BlogItemProps = StateProps & DispatchProps & OwnProps;

interface BlogItemState {}

export default class BlogItem extends Component<BlogItemProps, BlogItemState> {
  pushToArticle = (e): void => {
    const { data, history, type, lg } = this.props;
    e.preventDefault();
    history.push(`/${type}/${data.urls[lg]}`);
  };

  render(): JSX {
    const { data, type, readText, noDescription, lg } = this.props;

    return (
      <a
        className={styles('BlogItem')}
        href={`/${type}/${data.urls && data.urls[lg]}`}
        onClick={(e): void => this.pushToArticle(e)}
      >
        <div className={styles('top')}>
          {type !== 'jobs' && (
            <div className={styles('date')}>{moment(data.publicationDate).format('DD MMMM')}</div>
          )}
          <div className={styles('indic-container')}>
            <div
              className={styles('indic')}
              style={{
                backgroundColor: data.getCategories[0].colorCode,
              }}
            />
          </div>
        </div>
        <div
          className={styles('image')}
          style={{
            backgroundImage: `url(${data.thumbnail.full || data.thumbnail.large})`,
          }}
        />
        <div className={styles('text-container')}>
          <div className={styles('title')}>
            <TextItem path={data.title} />
          </div>
          {!noDescription && (
            <div className={styles('text')}>
              <TextItem path={data.teaser} />
            </div>
          )}
        </div>
        <div
          className={styles('link')}
          style={{
            backgroundColor: data.getCategories[0].colorCode,
          }}
        >
          <div className={styles('categorie')} />
          <div className={styles('read')}>
            <TextItem path={readText || 'Read More'} />
          </div>
        </div>
      </a>
    );
  }
}
