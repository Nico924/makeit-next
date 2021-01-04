import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import { text, boolean } from '@storybook/addon-knobs';

import UploadZone from './index';

storiesOf('seed/formItems/UploadZone', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Normal', () => (
    <Field
      name="test"
      component={UploadZone}
      noResize={boolean('noResize', true)}
      noPreview={boolean('noPreview', false)}
      roundedPreview={boolean('roundedPreview', false)}
      label={text('label', 'Upload zone')}
      errorTitle={text('errorTitle', 'errorTitle')}
      errorMessage={text('errorMessage', 'errorMessage')}
      accept={text('accept', 'image/*')}
      info={text('info', 'Veuillez choisir un fichier')}
      subinfo={text('subinfo', 'Format accepté: image/*')}
    />
  ));
