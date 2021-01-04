import React from 'react';
import { shallow } from 'enzyme';
import BusinessPrototypingMain from './BusinessPrototypingMain';

describe('BusinessPrototypingMain', () => {
  it('should render without crashing', () => {
    shallow(<BusinessPrototypingMain />);
  });
});
