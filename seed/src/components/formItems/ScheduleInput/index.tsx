import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ScheduleInput, { StateProps, DispatchProps, OwnProps } from './ScheduleInput';

const mapStateToProps = (state: StoreState): {} => ({
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleInput);

export default Wrapped;
