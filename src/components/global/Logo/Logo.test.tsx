import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

describe('Logo', () => {
  it('should render without crashing', () => {
    shallow(<Logo />);
  });
});
