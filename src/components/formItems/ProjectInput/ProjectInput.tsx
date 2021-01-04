import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Input from 'components/formItems/Input';
import Textarea from 'components/formItems/Textarea';
import CustomSelect from 'components/formItems/CustomSelect';
import CheckBoxInput from 'components/formItems/CheckBoxInput';
import { Field } from 'react-final-form';
import styleIdentifiers from './projectInput.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {}

export type ProjectInputProps = StateProps & DispatchProps & OwnProps;

const ProjectInput = (props: ProjectInputProps) => {
  const { seed, lg } = props;

  const renderComponent = () => {
    switch (seed) {
      case 'select':
        return CustomSelect;
      case 'textarea':
        return Textarea;
      case 'checkbox':
        return CheckBoxInput;
      default:
        return Input;
    }
  };

  return (
    <Field
      component={renderComponent()}
      {...props}
      fieldWrapperClassName={styles('wrapper')}
      contentWrapperClassName={styles('wrapper-content')}
      statusBarClassName={styles('status-bar')}
      errorClassName={styles('error')}
      labelClassName={styles('label-input')}
      effectActiveClassName={styles('effect-active')}
      effect
    />
  );
  // handleGoodInputType();
};

export default ProjectInput;
