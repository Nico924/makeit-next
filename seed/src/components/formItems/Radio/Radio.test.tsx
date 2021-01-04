import React from 'react';
import { shallow } from 'enzyme';
import Radio from './index';

describe('Radio', () => {
  it('should render without crashing', () => {
    shallow(<Radio />);
  });
});
