import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import file from 'store/file';
import LibraryImages, { StateProps, DispatchProps, OwnProps } from './LibraryImages';

const mapStateToProps = (state: StoreState): {} => ({
  files: state.file.list,
});

const mapDispatchToProps = {
  loadFile: file.actions.list.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryImages);

export default Wrapped;
