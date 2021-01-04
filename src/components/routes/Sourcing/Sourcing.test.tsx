import React from 'react';
import { shallow } from 'enzyme';
import Sourcing from './Sourcing';

describe('Sourcing', () => {
  it('should render without crashing', () => {
    shallow(<Sourcing />);
  });
});
