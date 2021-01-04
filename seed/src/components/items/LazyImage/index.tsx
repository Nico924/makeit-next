import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import LazyImage, { StateProps, DispatchProps, OwnProps } from './LazyImage';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LazyImage);

export default Wrapped;
