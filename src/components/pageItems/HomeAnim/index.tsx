import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import HomeAnim, { StateProps, DispatchProps, OwnProps } from './HomeAnim';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeAnim);

export default Wrapped;
