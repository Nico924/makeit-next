import React from 'react';
import { shallow } from 'enzyme';
import { reduxForm, Field } from 'redux-form';
import UploadZone from './UploadZone';

describe('UploadZone', () => {
  it('should render without crashing', () => {
    const Wrapper = reduxForm({ form: 'test' })(() => (
      <Field name="test" component={UploadZone} label="test" />
    ));
    shallow(<Wrapper />);
  });
});
