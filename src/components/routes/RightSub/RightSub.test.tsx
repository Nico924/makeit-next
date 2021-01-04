import React from 'react';
import { shallow } from 'enzyme';
import RightSub from './RightSub';

describe('RightSub', () => {
  it('should render without crashing', () => {
    shallow(<RightSub />);
  });
});
