/* eslint-disable react/button-has-type */
import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Loading from 'components/items/Loading';
import { config } from 'config/general';
import CustomIcon from 'components/items/CustomIcon';
import styleIdentifiers from './button.module.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  type: string;
  iconLeft: string;
  iconRight: string;
  color: string;
  noMargin: boolean;
  label: string;
  disabled: boolean;
  children: React.Node;
  squared: boolean;
  relative: boolean;
  shadow: boolean;
  className: string;
  action: Function;
  classNameText: string;
  variable: boolean;
  icon: string;
  large: boolean;
  small: boolean;
  loading: boolean;
  iconClassName?: string;
  noHover: boolean;
}

export type ButtonProps = StateProps & DispatchProps & OwnProps;

interface ButtonState {}

export default class Button extends React.Component<ButtonProps, ButtonState> {
  render(): JSX {
    const {
      type,
      icon,
      iconLeft,
      iconRight,
      color,
      noMargin,
      label,
      disabled,
      shadow,
      children,
      squared,
      relative,
      variable,
      large,
      small,
      className,
      action,
      textClassName,
      loading,
      dataCta,
      dataAttribute,
      id,
      noHover,
      iconClassName,
      reactIcons,
    } = this.props;

    return (
      <button
        className={styles(
          'Button',
          className,
          noMargin && 'no-margin',
          squared && 'squared',
          disabled && 'disabled',
          variable && 'variable',
          relative && 'relative',
          shadow && 'shadow',
          icon && 'icon',
          large && 'large',
          small && 'small',
          loading && 'with-loader',
          noHover && 'no-hover',
          (iconLeft || icon || iconRight) && 'with-icon',
          color,
          iconLeft || (iconRight && 'with-icon'),
        )}
        // disabled={disabled}
        type={type || 'button'}
        onClick={action}
        data-cta={dataCta}
        data-cta-value={dataAttribute}
        id={id}
      >
        {iconLeft && (
          <div className={styles('icon', 'icon-left', iconClassName)}>
            <CustomIcon reactIcons={reactIcons} icon={iconLeft} />
          </div>
        )}
        {children && children}
        {!children && !label && icon && (
          <div className={styles('icon')}>
            <CustomIcon reactIcons={reactIcons} icon={icon} />
          </div>
        )}
        {!children && label && (
          <TextItem
            dataCta={dataCta}
            id={id}
            className={styles('text', textClassName)}
            path={label}
          />
        )}
        {iconRight && (
          <div className={styles('icon', 'icon-right', iconClassName)}>
            <CustomIcon reactIcons={reactIcons} icon={iconRight} />
          </div>
        )}
        {/* {loading && config.buttonLoader && (
          <Loading light className={styles('loader')} loader={config.buttonLoader} />
        )} */}
      </button>
    );
  }
}
