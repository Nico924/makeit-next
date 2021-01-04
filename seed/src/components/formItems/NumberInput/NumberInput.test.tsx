import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={NumberInput} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
