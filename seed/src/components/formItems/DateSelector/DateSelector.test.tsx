
import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import DateSelector from './DateSelector';

describe('DateSelector', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={DateSelector} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
