import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Logo, { StateProps, DispatchProps, OwnProps } from './Logo';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Logo);

export default Wrapped;
