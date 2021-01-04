import React from 'react';
import { shallow } from 'enzyme';
import BlogMain from './BlogMain';

describe('BlogMain', () => {
  it('should render without crashing', () => {
    shallow(<BlogMain />);
  });
});
