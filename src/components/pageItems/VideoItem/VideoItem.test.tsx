import React from 'react';
import { shallow } from 'enzyme';
import VideoItem from './VideoItem';

describe('VideoItem', () => {
  it('should render without crashing', () => {
    shallow(<VideoItem />);
  });
});
