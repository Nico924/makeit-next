
import React from 'react';
import { shallow } from 'enzyme';
import PhoneNumber from './PhoneNumber';

describe('PhoneNumber', () => {
  it('should render without crashing', () => {
    shallow(<PhoneNumber value="+32474360900" />);
  });
});
