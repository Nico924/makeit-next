import React from 'react';
import { shallow } from 'enzyme';
import ProfileForm from './ProfileForm';

describe('ProfileForm', () => {
  it('should render without crashing', () => {
    shallow(<ProfileForm />);
  });
});
