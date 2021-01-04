import React from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames/bind';
import ProjectInput from 'components/formItems/ProjectInput';
import Button from 'components/items/Button';
import { required, email, composeValidators } from 'store/utils/validation';
import CustomButton from 'components/items/CustomButton';
import TextItem from 'components/items/TextItem';
import styleIdentifiers from './inlineContactForm.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  onSubmit: Function;
}

export type InlineContactFormProps = StateProps & DispatchProps & OwnProps;

const InlineContactForm = (props: InlineContactFormProps) => {
  const { handleSubmit, submitting, valid } = props;
  return (
    <form className={styles('InlineContactForm')} onSubmit={handleSubmit}>
      <ProjectInput name="email" label="email" validate={composeValidators(required, email)} />
      <div className={styles('InlineButton')} onClick={handleSubmit}>
        <TextItem path="Sign Up" />
      </div>
    </form>
  );
};

export default InlineContactForm;
