import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import CheckBoxInput, { StateProps, DispatchProps, OwnProps } from './CheckBoxInput';

const mapStateToProps = (state: StoreState): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CheckBoxInput);

export default Wrapped;
