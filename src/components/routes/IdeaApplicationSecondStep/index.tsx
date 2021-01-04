import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import IdeaApplicationSecondStep, { StateProps, DispatchProps, OwnProps } from './IdeaApplicationSecondStep';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(IdeaApplicationSecondStep);

export default Wrapped;
