import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Blurb, { StateProps, DispatchProps, OwnProps } from './Blurb';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Blurb);

export default Wrapped;
