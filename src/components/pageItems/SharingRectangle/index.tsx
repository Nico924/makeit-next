import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import SharingRectangle, { StateProps, DispatchProps, OwnProps } from './SharingRectangle';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(SharingRectangle);

export default Wrapped;
