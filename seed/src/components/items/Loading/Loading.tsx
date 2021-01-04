import React from 'react';
import classNames from 'classnames/bind';

import styleIdentifiers from './loading.module.scss';

const styles = classNames.bind(styleIdentifiers);

/**
 *
 *  Preloaders from http://samherbert.net/svg-loaders/
 *  included.
 *  Best are three-dots, rings, audio, ball-triangle, threedots.
 *  Classic : oval or tail-spin
 *
 */

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  loader: string;
  style: {};
  light: boolean;
  className: string;
}

export type LoadingProps = StateProps & DispatchProps & OwnProps;

interface LoadingState {}

export class Loading extends React.Component<LoadingProps, LoadingState> {
  render(): JSX {
    const { loader, style, light, className } = this.props;

    const img = loader || 'threedots';
    // eslint-disable-next-line import/no-dynamic-require
    const path = light ? require(`./assets/${img}.svg`) : require(`./assetsDark/${img}.svg`);

    return <img className={styles('Loading', className)} style={style} src={path} alt="preload" />;
  }
}

export default Loading;
