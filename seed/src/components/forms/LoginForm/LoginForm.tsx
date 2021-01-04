import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames/bind';
import Input from 'components/formItems/Input';
import Password from 'components/formItems/Password';
import Button from 'components/items/Button';
import GoogleAuth from 'components/global/GoogleAuth';
import FacebookAuth from 'components/global/FacebookAuth';
import { email, required, composeValidators } from 'store/utils/validation';
import Checkbox from 'components/formItems/Checkbox';

const styles = classNames.bind();

export interface StateProps {}

export interface DispatchProps {}

export interface FormData {}

export interface OwnProps {}

export type LoginFormProps = StateProps & DispatchProps & InjectedFormProps<FormData, OwnProps>;

interface LoginFormState {}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  render() {
    const {
      onSubmit,
      loading,
      google,
      facebook,
      textButton,
      labelPassword,
      labelEmail,
      googleClassName,
      facebookClassName,
      inputProps,
      buttonProps,
    } = this.props;
    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, valid }) => (
          <form className={styles('LoginForm')} onSubmit={handleSubmit}>
            <Field
              component={Input}
              name="email"
              type="email"
              label={labelEmail || 'Email'}
              validate={composeValidators(required, email)}
              {...inputProps}
            />
            <Field
              component={Password}
              name="password"
              label={labelPassword || 'Password'}
              validate={required}
              {...inputProps}
            />
            <Button
              disabled={submitting || !valid}
              label={textButton || 'Login'}
              type="submit"
              loading={loading}
              color="primary"
              {...buttonProps}
            />
            {google && <GoogleAuth className={googleClassName} config={google} />}
            {facebook && <FacebookAuth className={facebookClassName} config={facebook} />}
          </form>
        )}
      />
    );
  }
}
