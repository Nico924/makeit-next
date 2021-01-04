import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from './ResetPasswordForm';

describe('ResetPasswordForm', () => {
  it('should render without crashing', () => {
    shallow(<ResetPasswordForm />);
  });
});
