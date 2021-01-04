import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import InvestContactForm, { StateProps, DispatchProps, OwnProps } from './InvestContactForm';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(InvestContactForm);

export default Wrapped;
