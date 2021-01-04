import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import TagItem, { StateProps, DispatchProps, OwnProps } from './TagItem';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TagItem);

export default Wrapped;
