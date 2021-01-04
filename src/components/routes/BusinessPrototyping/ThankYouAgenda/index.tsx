import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ThankYouAgenda, { StateProps, DispatchProps, OwnProps } from './ThankYouAgenda';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThankYouAgenda);

export default Wrapped;
