import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ThankYou, { StateProps, DispatchProps, OwnProps } from './ThankYou';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThankYou);

export default Wrapped;
