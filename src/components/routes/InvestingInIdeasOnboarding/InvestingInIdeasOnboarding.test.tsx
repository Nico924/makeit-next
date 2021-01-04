import React from 'react';
import { shallow } from 'enzyme';
import InvestingInIdeasOnboarding from './InvestingInIdeasOnboarding';

describe('InvestingInIdeasOnboarding', () => {
  it('should render without crashing', () => {
    shallow(<InvestingInIdeasOnboarding />);
  });
});
