import React from 'react';
import { shallow } from 'enzyme';
import CustomArticle from './CustomArticle';

describe('CustomArticle', () => {
  it('should render without crashing', () => {
    shallow(<CustomArticle />);
  });
});
