import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import Button from 'components/items/Button';
import styleIdentifiers from './customButton.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type CustomButtonProps = StateProps & DispatchProps & OwnProps;

interface CustomButtonState {}

export default class CustomButton extends Component<CustomButtonProps, CustomButtonState> {
  render(): JSX {
    const { color, className, external, label, ...props } = this.props;
    return !external ? (
      <Button
        dataCta="cta"
        label={label}
        className={styles('CustomButton', color, className)}
        classNameText={styles('textButton')}
        {...props}
      />
    ) : (
      <a
        href={external}
        target="_blank"
        rel="noopener noreferrer"
        className={styles('CustomButton', color, className, 'external')}
      >
        <TextItem path={label} />
      </a>
    );
  }
}
