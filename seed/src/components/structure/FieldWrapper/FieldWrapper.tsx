import React, { Component } from 'react';
import classNames from 'classnames/bind';
import FormItemLabel, { FormItemLabelProps } from 'components/items/FormItemLabel';

import CustomIcon from 'components/items/CustomIcon';
import styleIdentifiers from './fieldWrapper.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  // say if the input has a value
  hasValue: boolean;
  // Additional className to add
  className: string;
  // Redux form input
  input: {};
  // Redux form meta
  meta: {};
  // Custom styling for the global field
  fieldWrapperClassName: string;
  fieldWrapperStyle: {};
  // Add border to the input
  withBorder: boolean;
  // Add border to the field value
  withValueBorder: boolean;
  // Custom styling for the content wrapper ( = content without icons)
  contentWrapperClassName: string;
  contentWrapperStyle: {};
  // Custom styling for the value
  valueClassName: string;
  valueStyle: {};
  // Center the value (not always applicable)
  centerValue: boolean;
  // Decrease padding for the types with-border and with-value-border
  small: boolean;
  // effect if active/focused
  effect: boolean;
  // disabled or not
  disabled: boolean;
  // shadow style for field
  shadow: boolean;
  // Right icon
  iconRight: string;
  iconRightStyle: {};
  iconRightClassName: string;
  iconRightAction: Function;
  // Left icon
  iconLeft: string;
  iconLeftStyle: {};
  iconLeftClassName: string;
  iconLeftAction: Function;
  // Children to append
  children: any;
  // Other children to display outside of the value
  secondChildren: any;
  // Add class name on active effect
  effectActiveClassName: string;
  // Overwrite bar color for active - error - valid
  activeBarColor: string;
  errorBarColor: string;
  validBarColor: string;
  // add not string near label in italic
  notRequired: string;
  // tabIndex
  tabIndex: string;
  onFocus: Function;
  onBlur: Function;

  noShadow?: boolean;
}

export type FieldWrapperProps = FormItemLabelProps & StateProps & DispatchProps & OwnProps;

interface FieldWrapperState {}

export default class FieldWrapper extends Component<FieldWrapperProps, FieldWrapperState> {
  iconLeft = (): JSX | boolean => {
    const { reactIcons, iconLeft, iconLeftAction, iconLeftStyle, iconLeftClassName } = this.props;

    if (!iconLeft) return false;

    if (typeof iconLeft === 'string') {
      return (
        iconLeft && (
          <div
            onClick={iconLeftAction}
            className={styles('icon-left', iconLeftAction && 'actionable', iconLeftClassName)}
            style={iconLeftStyle}
          >
            <CustomIcon reactIcons={reactIcons} icon={iconLeft} />
          </div>
        )
      );
    }

    return (
      <div
        onClick={iconLeftAction}
        className={styles('icon-left', iconLeftAction && 'actionable', iconLeftClassName)}
        style={iconLeftStyle}
      >
        {iconLeft}
      </div>
    );
  };

  iconRight = (): JSX => {
    const {
      reactIcons,
      iconRight,
      iconRightAction,
      iconRightStyle,
      iconRightClassName,
    } = this.props;

    if (iconRight && typeof iconRight === 'string') {
      return (
        iconRight && (
          <div
            onClick={iconRightAction}
            className={styles('icon-right', iconRightAction && 'actionable', iconRightClassName)}
            style={iconRightStyle}
          >
            <CustomIcon reactIcons={reactIcons} icon={iconRight} />
          </div>
        )
      );
    }
    if (!iconRight) return false;
    return (
      <div
        onClick={iconRightAction}
        className={styles('icon-right', iconRightAction && 'actionable', iconRightClassName)}
        style={iconRightStyle}
      >
        {iconRight}
      </div>
    );
  };

  renderLabel = (): JSX => {
    const {
      input,
      label,
      // Label part (see label)
      labelClassName,
      labelStyle,
      labelImage,
      labelIcon,
      labelIconClassName,
      labelIconStyle,
      star,
      notRequired,
    } = this.props;

    return (
      <FormItemLabel
        input={input}
        className={styles('label')}
        label={label}
        labelClassName={labelClassName}
        labelStyle={labelStyle}
        labelIcon={labelIcon}
        labelImage={labelImage}
        labelIconClassName={labelIconClassName}
        labelIconStyle={labelIconStyle}
        star={star}
        notRequired={notRequired}
      />
    );
  };

  renderContent = (borderType: string): JSX | boolean => {
    const {
      // value,
      contentWrapperClassName,
      contentWrapperStyle,
      statusBarClassName,
      disabledClassName,
      centerValue,
      valueClassName,
      valueStyle,
      children,
      secondChildren,
      // color
      errorBarColor,
      activeBarColor,
      validBarColor,
      disabled,
    } = this.props;

    if (borderType === 'with-border') {
      return (
        <>
          {this.iconLeft()}
          <div
            className={styles(
              'content-wrapper',
              centerValue && 'centered',
              contentWrapperClassName,
              disabled && 'disabled',
              disabled && disabledClassName,
            )}
            style={contentWrapperStyle}
          >
            {this.renderLabel()}
            <div className={styles('value', valueClassName)} style={valueStyle}>
              {children}
            </div>
            {secondChildren}
          </div>
          {this.iconRight()}
        </>
      );
    }
    if (borderType === 'with-value-border') {
      // const { valueWrapperClassName, valueWrapperStyle } = this.props;

      return (
        <>
          {this.renderLabel()}
          <div
            className={styles(
              'content-wrapper',
              contentWrapperClassName,
              centerValue && 'centered',
              disabled && 'disabled',
              disabled && disabledClassName,
            )}
            style={contentWrapperStyle}
          >
            {this.iconLeft()}
            <div className={styles('value', valueClassName)}>{children}</div>
            {this.iconRight()}
          </div>
          {secondChildren}
        </>
      );
    }
    if (borderType === 'with-border-bottom') {
      return (
        <>
          {this.iconLeft()}
          <div
            className={styles(
              'content-wrapper',
              contentWrapperClassName,
              centerValue && 'centered',
              disabled && 'disabled',
              disabled && disabledClassName,
            )}
            style={contentWrapperStyle}
          >
            {this.renderLabel()}
            <div className={styles('value', valueClassName)} style={valueStyle}>
              {children}
            </div>
          </div>
          {this.iconRight()}
          {secondChildren}
          <div
            className={styles('valid-bar', statusBarClassName)}
            style={validBarColor && { backgroundColor: validBarColor }}
          />
          <div
            className={styles('error-bar', statusBarClassName)}
            style={errorBarColor && { backgroundColor: errorBarColor }}
          />
          <div
            className={styles('active-bar', statusBarClassName)}
            style={activeBarColor && { backgroundColor: activeBarColor }}
          />
        </>
      );
    }
    return false;
  };

  /**
   * Important consideration about structure
   *
   * 1. with border bottom (default)
   *
   * fieldWrapper => border bottom here
   *  iconLeft
   *  contentWrapper
   *    label
   *    value
   *  iconRight
   *
   * 2. with border
   *
   * fieldWrapper => border here
   *  iconLeft
   *  contentWrapper
   *    label
   *    value
   *  iconRight
   *
   * 3. with border bottom
   *
   * fieldWrapper
   *  label
   *  contentWrapper => border here
   *    iconLeft
   *    value
   *    iconRight
   */

  render(): JSX {
    const {
      input,
      hasValue,
      label,
      tabIndex,
      meta: { active, valid, error, touched },
      effect,
      withBorder,
      withValueBorder,
      small,
      shadow,
      noShadow,
      // Styling
      // global
      fieldWrapperClassName,
      fieldWrapperStyle,
      iconLeft,
      iconRight,
      effectActiveClassName,
      beforeInputText,
      disabled,
    } = this.props;

    let borderType;
    if (withBorder) {
      borderType = 'with-border';
    } else if (withValueBorder) borderType = 'with-value-border';
    else borderType = 'with-border-bottom';

    let inputHasValue = hasValue;
    if (inputHasValue === undefined) {
      inputHasValue = input && input.value;
    }

    return (
      <div
        className={styles(
          'FieldWrapper',
          borderType,
          noShadow && 'no-shadow',
          !label && 'no-label',
          small && 'small',
          shadow && 'shadow',
          // meta related
          active && 'active',
          touched && valid && 'valid',
          touched && error && !disabled && 'error',
          // effect
          effect && 'effect',
          effect && (active || inputHasValue) && 'effect-active',
          effect && (active || inputHasValue) && effectActiveClassName,
          iconLeft && 'with-left-icon',
          iconRight && 'with-right-icon',
          fieldWrapperClassName,
          beforeInputText && 'with-text-before-input',
        )}
        style={fieldWrapperStyle}
        tabIndex={tabIndex}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {this.renderContent(borderType)}
      </div>
    );
  }
}
