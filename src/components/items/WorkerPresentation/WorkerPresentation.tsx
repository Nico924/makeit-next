import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import LazyImage from 'components/items/LazyImage';
import styleIdentifiers from './workerPresentation.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  className: string;
  picture: string;
  text: string;
  textClassName: string;
  pictureClassName: string;
  title: string;
  link: Function;
  hideDescInMobile: boolean;
}

export type WorkerPresentationProps = StateProps & DispatchProps & OwnProps;

interface WorkerPresentationState {}

export default class WorkerPresentation extends Component<
  WorkerPresentationProps,
  WorkerPresentationState
> {
  render(): JSX {
    const {
      className,
      text,
      children,
      picture,
      left,
      right,
      textClassName,
      pictureClassName,
      title,
      top,
      link,
      hideDescInMobile,
      mobile,
    } = this.props;

    const size = mobile ? 'small' : 'medium';
    const src = (picture && picture[size]) || picture;
    return (
      <div className={styles('WorkerPresentation', className)}>
        {top && top}
        {title && (
          <div className={styles('title-container')}>
            <TextItem path={title} />
          </div>
        )}
        <div className={styles('picture', pictureClassName)}>
          {left && (
            <div className={styles('left', 'up')}>
              <span>{left}</span>
            </div>
          )}
          <LazyImage src={src} alt="portrait" />
          {right && (
            <div className={styles('right', 'up')}>
              <span>{right}</span>
            </div>
          )}
        </div>
        {(text || children || right || left) && (
          <div
            className={styles(
              'text',
              textClassName,
              link && 'with-link',
              hideDescInMobile && 'hide-mobile',
            )}
          >
            <div>
              <div className={styles('text-container')}>
                {(right || left) && (
                  <span className={styles('text-side')}>{`${right || left} −`}</span>
                )}
                {text || children}
              </div>
              {link && <div className={styles('link')}>+</div>}
            </div>
          </div>
        )}
      </div>
    );
  }
}
