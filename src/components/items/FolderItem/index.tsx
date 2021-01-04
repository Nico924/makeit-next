import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import FolderItem, { StateProps, DispatchProps, OwnProps } from './FolderItem';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(FolderItem);

export default Wrapped;
