import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';
import app from 'store/app';

import ThanksPageStaas, { StateProps, DispatchProps, OwnProps } from './ThanksPageStaas';

const mapStateToProps = (state: StoreState): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ThanksPageStaas);

export default Wrapped;
