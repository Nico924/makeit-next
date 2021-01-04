import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from 'config/general';

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  icon: string;
  className: string;
  iconStyle: {};
  project: boolean;
  fontAwesome: boolean;
}

export type CustomIconProps = StateProps & DispatchProps & OwnProps;

interface CustomIconState {}

const CustomIcon = (props: CustomIconProps) => {
  const { reactIcons, icon, className, project, img, fontAwesome, ...rest } = props;

  const defaultIcon = config.defaultIcon;

  if (img) {
    return <img src={img} className={className} alt="icon" />;
  }

  if (reactIcons || defaultIcon === 'react-icons') {
    // needed for react
    const Icon = icon;
    return <Icon />;
  }

  if (fontAwesome || defaultIcon === 'fontawesome') {
    return <FontAwesomeIcon icon={icon} className={className} {...rest} />;
  }
  return false;
};

export default CustomIcon;
