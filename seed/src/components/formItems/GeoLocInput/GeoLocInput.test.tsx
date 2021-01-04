import React from 'react';
import { shallow } from 'enzyme';
import GeoLocInput from './index';

describe('GeoLocInput', () => {
  it('should render without crashing', () => {
    shallow(<GeoLocInput />);
  });
});
