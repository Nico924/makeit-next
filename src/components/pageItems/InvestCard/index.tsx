import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import InvestCard, { StateProps, DispatchProps, OwnProps } from './InvestCard';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(InvestCard);

export default Wrapped;
