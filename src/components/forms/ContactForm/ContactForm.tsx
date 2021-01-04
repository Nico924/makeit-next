import React, { Component } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import classNames from 'classnames/bind';
import TextInput from 'components/formItems/TextInput';
import CustomButton from 'components/items/CustomButton';
import { required } from 'store/utils/validation';
import styleIdentifiers from './contactForm.scss';
import CustomHubSpotForm from '../CustomHubSpotForm';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface FormData {}

export interface OwnProps {}

export type ContactFormProps = StateProps & DispatchProps & InjectedFormProps<FormData, OwnProps>;

interface ContactFormState {}

export default class ContactForm extends Component<ContactFormProps, ContactFormState> {
  render(): JSX {
    const { onSubmit, ...rest } = this.props;
    return (
      <div className={styles('ContactForm')}>
        <CustomHubSpotForm
          {...rest}
          portalId="3047087"
          onSubmit={onSubmit}
          formId="e4415a47-12dd-44a8-9f42-d12eb64bed01"
        />
      </div>
    );
  }
}
