import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import ThanksPage, { StateProps, DispatchProps, OwnProps } from './ThanksPage';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThanksPage);

export default Wrapped;
