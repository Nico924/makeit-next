import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import { withRouter } from 'react-router';

import SharingBlock, { StateProps, DispatchProps, OwnProps } from './SharingBlock';

const mapStateToProps = (state: StoreState): Record<string, any> => ({});

const mapDispatchToProps = {};

const Wrapped = withRouter(
  connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(SharingBlock),
);

export default Wrapped;
