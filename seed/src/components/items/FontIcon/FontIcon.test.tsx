
import React from 'react';
import { shallow } from 'enzyme';
import FontIcon from './FontIcon';

describe('FontIcon', () => {
  it('should render without crashing', () => {
    shallow(<FontIcon name="search" />);
  });
});
