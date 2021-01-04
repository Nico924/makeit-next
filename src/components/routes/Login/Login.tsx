import React, { Component } from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import LoginForm from 'components/forms/LoginForm';
import styleIdentifiers from './login.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  login: Function;
}

export interface OwnProps {}

export type LoginProps = StateProps & DispatchProps & OwnProps;

interface LoginState {}

export default class Login extends Component<LoginProps, LoginState> {
  submit = (values: Object): void => {
    const { login } = this.props;
    if (login) login(values);
  };

  render(): JSX {
    return (
      <div className={styles('Login')}>
        <h1>
          <TextItem path="Login" />
        </h1>
        <LoginForm onSubmit={this.submit} />
      </div>
    );
  }
}
