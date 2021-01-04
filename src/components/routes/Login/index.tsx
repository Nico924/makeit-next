import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import auth from 'store/auth';

import Login, { StateProps, DispatchProps, OwnProps } from './Login';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {
  login: auth.actions.login.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default Wrapped;
