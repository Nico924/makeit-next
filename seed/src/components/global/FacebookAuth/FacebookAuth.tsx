import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { CgFacebook } from 'react-icons/cg';
import styleIdentifiers from './facebookAuth.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  config: {};
  appId: string;
  text: string;
  className: string;
}

export type FacebookAuthProps = StateProps & DispatchProps & OwnProps;

interface FacebookAuthState {}

export default class FacebookAuth extends React.Component<FacebookAuthProps, FacebookAuthState> {
  responseFacebook = (response: {}): void => {
    this.handleResponse(response);
  };

  handleResponse = (response: {}): void => {
    const { callback, loginFacebook, registerFacebook, register } = this.props;
    console.log('facebook resp', response);

    if (!response || !response.accessToken) return;

    const payload = {
      data: {
        // eslint-disable-next-line
        access_token: response.accessToken,
      },
      addLanguage: true,
      callback,
      provider: 'facebook',
    };

    if (register) {
      registerFacebook(payload);
      return;
    }

    loginFacebook(payload);
  };

  render(): JSX {
    const { config, fields, className } = this.props;
    return (
      <FacebookLogin
        disableMobileRedirect
        appId={config.appId}
        fields={fields || 'name,email'}
        callback={this.responseFacebook}
        render={(renderProps): JSX => (
          <button
            type="button"
            className={styles('FacebookAuth', className)}
            onClick={renderProps.onClick}
          >
            <span className={styles('icon')}>
              <CgFacebook />
            </span>
            <TextItem className={styles('text')} path={config.text || 'Facebook Login'} />
          </button>
        )}
      />
    );
  }
}
