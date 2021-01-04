
import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={ColorPicker} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
