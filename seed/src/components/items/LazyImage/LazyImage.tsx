import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styleIdentifiers from './lazyImage.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  height: number;
  width: number;
  src: string;
  alt: string;
  className: string;
}

export type LazyImageProps = StateProps & DispatchProps & OwnProps;

interface LazyImageState {}

export default class LazyImage extends Component<LazyImageProps, LazyImageState> {
  render(): JSX {
    const { height, threshold, src, width, alt, className } = this.props;
    return (
      <LazyLoadImage
        threshold={threshold || 0}
        wrapperClassName={styles('LazyImage', className)}
        src={src}
        height={height || null}
        width={width || null}
        alt={alt}
      />
    );
  }
}
