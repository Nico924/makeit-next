import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Illustration from 'components/items/Illustration';
import styleIdentifiers from './quoteArticleItem.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type QuoteArticleItemProps = StateProps & DispatchProps & OwnProps;

interface QuoteArticleItemState {}

export default class QuoteArticleItem extends Component<
  QuoteArticleItemProps,
  QuoteArticleItemState
> {
  render(): JSX {
    const { children, className } = this.props;
    return (
      <div className={styles('QuoteArticleItem', className)}>
        <div className={styles('illu')}>
          <Illustration illu="quote" className={styles('img')} />
        </div>
        <div className={styles('child')}>{children}</div>
      </div>
    );
  }
}
