import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ResetPasswordForm, { StateProps, DispatchProps, OwnProps } from './ResetPasswordForm';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordForm);

export default Wrapped;
