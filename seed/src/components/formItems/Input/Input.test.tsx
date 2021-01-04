import React from 'react';
import { shallow } from 'enzyme';
import { Form, Field } from 'react-final-form';
import Input from './Input';

describe('Input', () => {
  it('should render without crashing', () => {
    const Wrapper = (
      <Form
        render={() => {
          return <Field name="test" component={Input} label="test" />;
        }}
      />
    );
    shallow(<Wrapper />);
  });
});
