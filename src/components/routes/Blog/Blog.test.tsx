import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe('Blog', () => {
  it('should render without crashing', () => {
    shallow(<Blog />);
  });
});
