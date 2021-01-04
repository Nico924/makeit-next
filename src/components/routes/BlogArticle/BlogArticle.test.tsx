import React from 'react';
import { shallow } from 'enzyme';
import BlogArticle from './BlogArticle';

describe('BlogArticle', () => {
  it('should render without crashing', () => {
    shallow(<BlogArticle />);
  });
});
