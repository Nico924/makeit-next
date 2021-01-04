import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import DurationItem, { StateProps, DispatchProps, OwnProps } from './DurationItem';

const mapStateToProps = (state: StoreState): {} => ({
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(DurationItem);

export default Wrapped;
