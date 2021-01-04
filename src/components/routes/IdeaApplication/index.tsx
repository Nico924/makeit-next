import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import IdeaApplication, { StateProps, DispatchProps, OwnProps } from './IdeaApplication';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(IdeaApplication);

export default Wrapped;
