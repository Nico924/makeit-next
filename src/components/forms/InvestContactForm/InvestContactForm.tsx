import React from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames/bind';
import ProjectInput from 'components/formItems/ProjectInput';
import { required, email, composeValidators } from 'store/utils/validation';
import CustomButton from 'components/items/CustomButton';
import styleIdentifiers from './investContactForm.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  onSubmit: Function;
}

export type InvestContactFormProps = StateProps & DispatchProps & OwnProps;

const InvestContactForm = (props: InvestContactFormProps) => {
  const { handleSubmit, submitting, valid } = props;
  return (
    <form className={styles('InvestContactForm')} onSubmit={handleSubmit}>
      <ProjectInput
        name="lastname"
        label="investinideasus.Forms.lastname"
        validate={required}
        noMargin
      />
      <ProjectInput name="firstname" label="investinideasus.Forms.firstname" validate={required} />
      <ProjectInput
        seed="email"
        name="email"
        type="email"
        label="investinideasus.Forms.email"
        validate={composeValidators(required, email)}
      />
      <ProjectInput
        name="message"
        seed="textarea"
        label="investinideasus.Forms.message"
        rows={5}
        validate={required}
      />
      <CustomButton
        className={styles('button')}
        color="pink"
        label="investinideasus.Forms.submitMessage"
        type="submit"
      />
    </form>
  );
};

export default InvestContactForm;
