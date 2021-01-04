import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={Textarea} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
