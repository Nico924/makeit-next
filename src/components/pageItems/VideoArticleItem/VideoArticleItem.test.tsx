import React from 'react';
import { shallow } from 'enzyme';
import VideoArticleItem from './VideoArticleItem';

describe('VideoArticleItem', () => {
  it('should render without crashing', () => {
    shallow(<VideoArticleItem />);
  });
});
