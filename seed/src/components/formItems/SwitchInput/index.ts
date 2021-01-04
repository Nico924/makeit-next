import { connect } from 'react-redux';

import SwitchInput from './SwitchInput';

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const Wrapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwitchInput);

export default Wrapped;
