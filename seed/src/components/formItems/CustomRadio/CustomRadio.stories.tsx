import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import CustomRadio from './CustomRadio';

storiesOf('seed/formItems/CustomRadio', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Normal', () => (
    <div>
      <Field
        name="test"
        component={CustomRadio}
        label="what"
        items={[{ value: 'whut' }, { value: 'whot' }]}
      />
    </div>
  ));
