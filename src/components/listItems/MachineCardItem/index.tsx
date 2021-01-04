import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import MachineCardItem, { StateProps, DispatchProps, OwnProps } from './MachineCardItem';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(MachineCardItem);

export default Wrapped;
