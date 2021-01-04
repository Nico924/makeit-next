
import React from 'react';
import { shallow } from 'enzyme';
import Percentage from './Percentage';

describe('Percentage', () => {
  it('should render without crashing (string)', () => {
    shallow(<Percentage value="21" />);
  });
  it('should render without crashing (number)', () => {
    shallow(<Percentage value={21} />);
  });
});
