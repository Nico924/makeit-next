// import Password from './Password';

// export default Password;

import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import Input, { StateProps, DispatchProps, OwnProps } from './Password';

const mapStateToProps = (state: StoreState): {} => ({
  content: state.content.raw,
  lg: state.content.lg,
});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);

export default Wrapped;
