import React from 'react';
import { shallow } from 'enzyme';
import SimpleTooltip from './SimpleTooltip';

describe('SimpleTooltip', () => {
  it('should render without crashing', () => {
    shallow(<SimpleTooltip />);
  });
});
