import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import file from 'store/file';
import ChatInput, { StateProps, DispatchProps, OwnProps } from './ChatInput';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {
  uploadApollo: file.actions.upload.request.action,
};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ChatInput);

export default Wrapped;
