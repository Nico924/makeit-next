import { connect } from 'react-redux';
import auth from 'store/auth';
import GoogleAuth, { GoogleAuthProps } from './GoogleAuth';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  loginGoogle: auth.actions.loginSocial.request.action,
  registerGoogle: auth.actions.registerSocial.request.action,
};

const Wrapped = connect<GoogleAuthProps>(mapStateToProps, mapDispatchToProps)(GoogleAuth);

export default Wrapped;
