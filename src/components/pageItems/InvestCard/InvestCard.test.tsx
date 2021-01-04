import React from 'react';
import { shallow } from 'enzyme';
import InvestCard from './InvestCard';

describe('InvestCard', () => {
  it('should render without crashing', () => {
    shallow(<InvestCard />);
  });
});
