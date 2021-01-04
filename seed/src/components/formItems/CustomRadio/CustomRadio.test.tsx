import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import CustomRadio from './CustomRadio';

describe('CustomRadio', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={CustomRadio} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
