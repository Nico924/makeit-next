import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import InvestIllustration, { StateProps, DispatchProps, OwnProps } from './InvestIllustration';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(InvestIllustration);

export default Wrapped;
