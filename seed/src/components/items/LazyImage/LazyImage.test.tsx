import React from 'react';
import { shallow } from 'enzyme';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('should render without crashing', () => {
    shallow(<LazyImage />);
  });
});
