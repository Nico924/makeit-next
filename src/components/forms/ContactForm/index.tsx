import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ContactForm, { StateProps, DispatchProps, FormData, OwnProps } from './ContactForm';
/*
const createReduxForm = reduxForm<FormData, OwnProps>({
  // a unique name for the form
  form: 'contactForm',
});

const form = createReduxForm(ContactForm);
*/
const mapStateToProps = (): object => ({});

const mapDispatchToProps = {};

const Wrapped = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(ContactForm);

export default Wrapped;
