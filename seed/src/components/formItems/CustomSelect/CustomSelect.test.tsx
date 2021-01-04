import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import CustomSelect from './CustomSelect';

describe('CustomSelect', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={CustomSelect} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
