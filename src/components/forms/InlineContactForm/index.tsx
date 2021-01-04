import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import InlineContactForm, { StateProps, DispatchProps, OwnProps } from './InlineContactForm';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(InlineContactForm);

export default Wrapped;
