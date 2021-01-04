import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import TagsInput, { StateProps, DispatchProps, OwnProps } from './TagsInput';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TagsInput);

export default Wrapped;
