import React from 'react';
import { Field } from 'react-final-form';
import classNames from 'classnames/bind';
import { required, email, composeValidators } from 'store/utils/validation';
import CustomButton from 'components/items/CustomButton';
import ProjectInput from 'components/formItems/ProjectInput';
import ProjectRadio from 'components/formItems/ProjectRadio';
import styleIdentifiers from './profileForm.scss';

const styles = classNames.bind(styleIdentifiers);

export interface StateProps {}

export interface DispatchProps {}

export interface OwnProps {
  onSubmit: Function;
}

export type ProfileFormProps = StateProps & DispatchProps & OwnProps;

const ProfileForm = (props: ProfileFormProps) => {
  const { handleSubmit, submitting, valid, values } = props;
  return (
    <form className={styles('ProfileForm')} onSubmit={handleSubmit}>
      <ProjectInput
        name="lastname"
        label="investinideasus.Forms.lastname"
        validate={required}
        noMargin
      />
      <ProjectInput
        className={styles('small-margin')}
        name="firstname"
        label="investinideasus.Forms.firstname"
        validate={required}
      />
      <ProjectInput
        seed="email"
        className={styles('small-margin')}
        name="email"
        type="email"
        label="investinideasus.Forms.email"
        validate={composeValidators(required, email)}
      />
      <ProjectInput
        className={styles('small-margin')}
        name="howInfo"
        label="investinideasus.Forms.how"
        validate={required}
        seed="textarea"
      />
      <CustomButton
        className={styles('button')}
        color="pink"
        label="investinideasus.Forms.submitProfile"
        type="submit"
      />
    </form>
  );
};

export default ProfileForm;
