import { connect } from 'react-redux';
import { StoreState } from 'store/rootReducer';

import app from 'store/app';
import DateTimePicker, { DateTimePickerProps } from './DateTimePicker';

const mapStateToProps = (state: StoreState) => ({
  lg: state.content.lg,
  content: state.content.raw,
});

const mapDispatchToProps = {};

const Wrapped = connect<DateTimePickerProps>(mapStateToProps, mapDispatchToProps)(DateTimePicker);

export default Wrapped;
