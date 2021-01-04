import { connect } from 'react-redux';
import auth from 'store/auth';
import { StoreState } from 'store/rootReducer';
import FacebookAuth, { StateProps, DispatchProps, OwnProps } from './FacebookAuth';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  loginFacebook: auth.actions.loginSocial.request.action,
  registerFacebook: auth.actions.registerSocial.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(FacebookAuth);

export default Wrapped;
