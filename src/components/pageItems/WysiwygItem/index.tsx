import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import WysiwygItem, { StateProps, DispatchProps, OwnProps } from './WysiwygItem';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(WysiwygItem);

export default Wrapped;
