import React from 'react';
import { shallow } from 'enzyme';
import ParkPlace from './ParkPlace';

describe('ParkPlace', () => {
  it('should render without crashing', () => {
    shallow(<ParkPlace />);
  });
});
