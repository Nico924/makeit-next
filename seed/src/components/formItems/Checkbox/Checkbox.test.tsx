import React from 'react';
import { shallow } from 'enzyme';
import { Form, Field } from 'react-final-form';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should render without crashing', () => {
    const Wrapper = (
      <Form
        render={() => {
          return <Field name="test" component={Checkbox} label="test" />;
        }}
      />
    );
    shallow(<Wrapper />);
  });
});
