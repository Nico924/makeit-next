import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import VideoItem, { StateProps, DispatchProps, OwnProps } from './VideoItem';

const mapStateToProps = (state: StoreState): {} => ({
  lg: state.content.lg,
  content: state.content.raw,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoItem);

export default Wrapped;
