import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import TextInput from './TextInput';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

storiesOf('seed/formItems/TextInput', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Normal', () => <Field name="test" component={ TextInput } label="test" />);
