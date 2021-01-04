import React from 'react';
import { shallow } from 'enzyme';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
  it('should render without crashing', () => {
    shallow(<CustomButton />);
  });
});
