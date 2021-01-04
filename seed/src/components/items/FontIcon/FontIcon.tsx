import * as React from 'react';
import classNames from 'classnames/bind';
import styleIdentifiers from './fontIcon.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  name: string;
  className: string;
  colorName: string;
  style: {};
  onClick: Function;
}

export type FontIconProps = StateProps & DispatchProps & OwnProps;

interface FontIconState {}

const FontIcon = (props: FontIconProps) => {
  const { name, colorName, className, style, onClick } = props;

  return (
    <span
      className={styles('font-icon', `icon-${name}`, colorName, className)}
      style={style}
      onClick={onClick}
    />
  );
};

export default FontIcon;
