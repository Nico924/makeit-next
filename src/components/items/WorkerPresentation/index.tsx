import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import WorkerPresentation, { StateProps, DispatchProps, OwnProps } from './WorkerPresentation';

const mapStateToProps = (state: StoreState): object => ({
  mobile: state.app.isMobile,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(WorkerPresentation);

export default Wrapped;
