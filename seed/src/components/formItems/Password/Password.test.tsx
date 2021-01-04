import React from 'react';
import { shallow } from 'enzyme';
import { Form, Field } from 'react-final-form';
import Password from './Password';

describe('Input', () => {
  it('should render without crashing', () => {
    const Wrapper = (
      <Form
        render={() => {
          return <Field name="test" component={Password} label="test" />;
        }}
      />
    );
    shallow(<Password />);
  });
});
