import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styleIdentifiers from './logo.module.scss';

const LogoWhite = '/assets/newLogo.svg';
const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  className: string;
}

export type LogoProps = StateProps & DispatchProps & OwnProps;

interface LogoState {}

export default class Logo extends Component<LogoProps, LogoState> {
  handleLogo = (): JSX => {
    const { type } = this.props;
    switch (type) {
      case 'white':
        return LogoWhite;
      default:
        return LogoWhite;
    }
  };

  render(): JSX {
    const { className } = this.props;
    return (
      <div className={styles('Logo', className)}>
        <Image width={220} height={85} src={this.handleLogo()} alt="logo" />
      </div>
    );
  }
}
