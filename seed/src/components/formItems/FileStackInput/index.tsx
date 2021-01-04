import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import FileStackInput, { StateProps, DispatchProps, OwnProps } from './FileStackInput';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(FileStackInput);

export default Wrapped;
