import React from 'react';
import { shallow } from 'enzyme';
import InvestingInIdeas from './InvestingInIdeas';

describe('InvestingInIdeas', () => {
  it('should render without crashing', () => {
    shallow(<InvestingInIdeas />);
  });
});
