import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Field } from 'react-final-form';
import Radio from './Radio';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

storiesOf('seed/formItems/Radio', module)
  .addDecorator(story => {
    const Wrapper = <Form onSubmit={() => {}} render={story} />;
    return <Wrapper />;
  })
  .add('Normal', () => <Field name="test" component={ Radio } label="test" />);
