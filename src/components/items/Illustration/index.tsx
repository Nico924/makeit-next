import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Illustration, { StateProps, DispatchProps, OwnProps } from './Illustration';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Illustration);

export default Wrapped;
