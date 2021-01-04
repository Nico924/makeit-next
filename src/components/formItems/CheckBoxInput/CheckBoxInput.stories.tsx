import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import CheckBoxInput from './CheckBoxInput';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

storiesOf('seed/formItems/CheckBoxInput', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Normal', () => <Field name="test" component={ CheckBoxInput } label="test" />);
