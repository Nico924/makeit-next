
import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import ColorPicker from './ColorPicker';


storiesOf('seed/formItems/ColorPicker', module)
  .addDecorator(story => {
    
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Normal', () => <Field name="test" component={ColorPicker} label="ColorPicker" />);
