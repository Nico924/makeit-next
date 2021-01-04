import { connect } from 'react-redux';
import LoginForm, { StateProps, DispatchProps, FormData, OwnProps } from './LoginForm';

const mapStateToProps = (): {} => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default Wrapped;
