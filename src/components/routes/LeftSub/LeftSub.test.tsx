import React from 'react';
import { shallow } from 'enzyme';
import LeftSub from './LeftSub';

describe('LeftSub', () => {
  it('should render without crashing', () => {
    shallow(<LeftSub />);
  });
});
