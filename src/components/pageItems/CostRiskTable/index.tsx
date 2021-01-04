import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import CostRiskTable, { StateProps, DispatchProps, OwnProps } from './CostRiskTable';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CostRiskTable);

export default Wrapped;
