import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Image from 'next/image';
import styleIdentifiers from './cardItem.module.scss';

const Close = '/assets/close.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  className: string;
  content: string[] | string;
  title: string;
  contentClassName: string;
  action: Function;
  noPadding: boolean;
  noLine: boolean;
  style: Record<string, any>;
  outContent: Record<string, any>;
  onlyTitleMobile: boolean;
  titleClassName: string;
  reverseClose: boolean;
}

export type CardItemProps = StateProps & DispatchProps & OwnProps;

interface CardItemState {}

export default class CardItem extends Component<CardItemProps, CardItemState> {
  renderContent = (): JSX => {
    const { content } = this.props;
    if (Array.isArray(content)) {
      return content.map(
        (item, key): JSX => (
          <div className={styles('item')} key={key}>
            {item}
          </div>
        ),
      );
    }
    return content;
  };

  render(): JSX {
    const {
      noHeader,
      className,
      action,
      title,
      contentClassName,
      noPadding,
      content,
      children,
      noLine,
      style,
      outContent,
      onlyTitleMobile,
      titleClassName,
      mobileCross,
      reverseClose,
      noClose,
    } = this.props;

    return (
      <div className={styles('CardItem', className)} style={style}>
        {!noHeader && (
          <div className={styles('title-container', reverseClose && 'reverse-title')}>
            {!noClose && (
              <div
                className={styles('close', mobileCross && 'close-mobile', action && 'pointer')}
                onClick={(): Function => action && action()}
              >
                <Image width={20} height={20} src={Close} alt="close" />
              </div>
            )}
            <div className={styles('title')}>
              {!noLine && (
                <div className={styles('line-container')}>
                  <div className={styles('line')} />
                  <div className={styles('line')} />
                </div>
              )}
              <div
                className={styles(
                  'text-container',
                  onlyTitleMobile && 'onlyTitleMobile',
                  titleClassName,
                )}
              >
                <div className={styles('text')}>
                  <TextItem path={title} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={styles(
            'content',
            !Array.isArray(content) && 'text',
            contentClassName,
            noPadding && 'no_padding',
          )}
        >
          {content ? this.renderContent() : children}
        </div>
        {outContent}
      </div>
    );
  }
}
