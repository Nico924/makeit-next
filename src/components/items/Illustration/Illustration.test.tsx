import React from 'react';
import { shallow } from 'enzyme';
import Illustration from './Illustration';

describe('Illustration', () => {
  it('should render without crashing', () => {
    shallow(<Illustration />);
  });
});
