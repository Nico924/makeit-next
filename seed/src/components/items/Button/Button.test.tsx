import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should render without crashing', () => {
    shallow(<Button label="Test" />);
  });
});
