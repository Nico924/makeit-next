import React from 'react';
import { shallow } from 'enzyme';
import About from './About';

describe('About', () => {
  it('should render without crashing', () => {
    shallow(<About />);
  });
});
