import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ThanksSourcing, { StateProps, DispatchProps, OwnProps } from './ThanksSourcing';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThanksSourcing);

export default Wrapped;
