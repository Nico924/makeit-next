import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import CustomIcon from 'components/items/CustomIcon';
import styleIdentifiers from './formElement.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  // Additional className
  className: string;
  // Class for the error to override the error style
  errorClassName: string;
  // Object for the error to override the error style
  errorStyle: {};
  // Add basic margin or not
  noMargin: boolean;
  // Hide error
  noError: boolean;
  // Display error
  showError: boolean;
  // Meta to about the input form
  meta: {};
  // Rest of the form
  children: any;
  outsideIconLeft: string;
  outsideIconLeftClassName: string;

  // warning
  warning: string;
  warningClassName: string;
  warningStyle: object;

  // info
  info: string;
  infoClassName: string;
  infoStyle: object;
}

export type FormElementProps = StateProps & DispatchProps & OwnProps;

interface FormElementState {}

export default class FormElement extends React.Component<FormElementProps, FormElementState> {
  render(): JSX {
    const {
      label,
      className,
      children,
      childClassName,
      errorClassName,
      errorStyle,
      noMargin,
      noError,
      showError,
      outsideIconLeft,
      reactIcons,
      outsideIconLeftClassName,
      meta: { error, touched },
      warning,
      warningClassName,
      warningStyle,
      // info
      info,
      infoClassName,
      infoStyle,
      style,
      disabled,
    } = this.props;

    return (
      <div
        className={styles(
          'FormElement',
          className,
          noMargin && 'no-margin',
          !label && 'no-label',
          outsideIconLeft && 'with-icon-left',
        )}
        style={style}
      >
        {outsideIconLeft && (
          <div className={styles('outside-icon-left', outsideIconLeftClassName)}>
            {typeof outsideIconLeft === 'string' ? (
              <CustomIcon reactIcons={reactIcons} icon={outsideIconLeft} />
            ) : (
              outsideIconLeft
            )}
          </div>
        )}
        <div className={styles('child-form-element', childClassName)}>
          {children}
          {!disabled && (!noError || showError) && error && touched && (
            <div className={styles('error-message', errorClassName)} style={errorStyle}>
              <TextItem path={(error && error.error) || error} replace={error && error.replace} />
            </div>
          )}
          {info && (
            <div className={styles('info-message', infoClassName)} style={infoStyle}>
              <TextItem path={info} replace={info && info.replace} />
            </div>
          )}
          {warning && (
            <div className={styles('warning-message', warningClassName)} style={warningStyle}>
              <TextItem path={warning} replace={warning && warning.replace} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
