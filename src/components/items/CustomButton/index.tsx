import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import CustomButton, { StateProps, DispatchProps, OwnProps } from './CustomButton';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CustomButton);

export default Wrapped;
