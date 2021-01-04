import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import InvestFooter, { StateProps, DispatchProps, OwnProps } from './InvestFooter';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(InvestFooter);

export default Wrapped;
