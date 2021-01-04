import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import VideoArticleItem, { StateProps, DispatchProps, OwnProps } from './VideoArticleItem';

const mapStateToProps = (state: StoreState): object => ({
  lg: state.content.lg,
  content: state.content && state.content.raw,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(VideoArticleItem);

export default Wrapped;
