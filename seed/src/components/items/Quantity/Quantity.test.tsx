import React from 'react';
import { shallow } from 'enzyme';
import Price from './index';

describe('Price', () => {
  it('should render without crashing', () => {
    shallow(<Price />);
  });
});
