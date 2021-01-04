import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import StartWith, { StateProps, DispatchProps, OwnProps } from './StartWith';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(StartWith);

export default Wrapped;
