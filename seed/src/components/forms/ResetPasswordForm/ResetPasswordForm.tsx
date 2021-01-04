import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames/bind';
import Input from 'components/formItems/Input';
import Button from 'components/items/Button';
import { required, email, composeValidators } from 'store/utils/validation';
import styleIdentifiers from './resetPasswordForm.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  onSubmit: Function;
}

export type ResetPasswordFormProps = StateProps & DispatchProps & OwnProps;

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { onSubmit } = props;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, valid }) => (
        <form className={styles('LoginForm')} onSubmit={handleSubmit}>
          <Field
            component={Input}
            name="email"
            type="email"
            label="Email"
            validate={composeValidators(required, email)}
          />
          <Button disabled={!valid || submitting} label="Submit" type="submit" />
        </form>
      )}
    />
  );
};

export default ResetPasswordForm;
