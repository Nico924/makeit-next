import React from 'react';
import { shallow } from 'enzyme';
import ThanksPageBlog from './ThanksPageBlog';

describe('ThanksPageBlog', () => {
  it('should render without crashing', () => {
    shallow(<ThanksPageBlog />);
  });
});
