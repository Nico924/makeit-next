import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { Spring } from 'react-spring/renderprops.cjs';
import styleIdentifiers from './homeAnim.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  children: object;
  leftAnim: boolean;
  rightAnim: boolean;
  className: string;
  bottomAnim: boolean;
  delay: number;
}

export type HomeAnimProps = StateProps & DispatchProps & OwnProps;

interface HomeAnimState {}

export default class HomeAnim extends Component<HomeAnimProps, HomeAnimState> {
  render(): JSX {
    const {
      children,
      active,
      className,
      leftAnim,
      rightAnim,
      bottomAnim,
      delay,
      ...rest
    } = this.props;
    return (
      <Spring
        {...rest}
        from={{
          left: leftAnim && !active ? 100 : 0,
          right: rightAnim && !active ? 100 : 0,
          bottom: bottomAnim && !active ? 150 : 0,
          opacity: !active ? 0 : 1,
        }}
        to={{
          left: leftAnim && !active ? 0 : 0,
          right: rightAnim && !active ? 0 : 0,
          bottom: bottomAnim && !active ? 0 : 0,
          opacity: !active ? 1 : 1,
        }}
        delay={!active && delay}
      >
        {({ left, right, bottom, opacity }): JSX => (
          <div
            style={{
              left: leftAnim && `-${left}%`,
              right: rightAnim && `-${right}%`,
              bottom: bottomAnim && `-${bottom}px`,
              opacity,
            }}
            className={styles(className)}
          >
            {children}
          </div>
        )}
      </Spring>
    );
  }
}
