
import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should render without crashing', () => {
    shallow(<Tooltip />);
  });
});
