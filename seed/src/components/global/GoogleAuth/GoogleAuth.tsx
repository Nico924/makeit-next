import * as React from 'react';
import classNames from 'classnames/bind';
import TextItem from 'components/items/TextItem';
import GoogleLogin from 'react-google-login';
import styleIdentifiers from './googleAuth.scss';
import google from './assets/google.svg';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {
  loginGoogle: Function;
}

export interface OwnProps {
  className: string;
  config: {};
  auth: string;
  text: string;
}

export type GoogleAuthProps = StateProps & DispatchProps & OwnProps;

interface GoogleAuthState {}

export default class GoogleAuth extends React.Component<GoogleAuthProps, GoogleAuthState> {
  responseGoogle = (response: {}): void => {
    this.handleResponse(response);
  };

  handleResponse = (response: {}): void => {
    const { callback, loginGoogle, registerGoogle, register } = this.props;

    console.log('google resp', response);

    // do not call the api without the token
    if (!response || !response.accessToken || !response.tokenId) return;

    const payload = {
      data: {
        // eslint-disable-next-line
        access_token: response.accessToken,
        // eslint-disable-next-line
        id_token: response.tokenId,
      },
      addLanguage: true,
      callback,
      provider: 'google',
    };

    if (register) {
      registerGoogle(payload);
      return;
    }

    loginGoogle(payload);
  };

  render(): JSX {
    const { config, className } = this.props;
    return (
      <GoogleLogin
        render={renderProps => (
          <button
            className={styles('GoogleAuth', className)}
            type="button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className={styles('icon')}>
              <img src={google} alt="google-icon" />
            </div>
            <TextItem className={styles('text')} path={config.text || 'Google login'} />
          </button>
        )}
        isSignedIn={false}
        clientId={config.auth}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}
