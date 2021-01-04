import React from 'react';
import { shallow } from 'enzyme';
import BlogItem from './BlogItem';

describe('BlogItem', () => {
  it('should render without crashing', () => {
    shallow(<BlogItem />);
  });
});
