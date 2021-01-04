import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Field } from 'react-final-form';
import Checkbox from './Checkbox';

storiesOf('seed/formItems/Checkbox', module)
  .addDecorator(story => {
    const Wrapper = <Form onSubmit={() => {}} render={story} />;
    return <Wrapper />;
  })
  .add('Custom', () => <Field name="test" component={Checkbox} label="Checkbox" />);
