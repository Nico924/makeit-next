import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ProfileForm, { StateProps, DispatchProps, OwnProps } from './ProfileForm';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm);

export default Wrapped;
