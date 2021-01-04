import React from 'react';
import { shallow } from 'enzyme';
import Amount from './Amount';

describe('Amount', () => {
  it('should render without crashing', () => {
    shallow(<Amount value={1000} />);
  });
});
