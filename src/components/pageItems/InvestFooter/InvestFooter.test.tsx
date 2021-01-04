import React from 'react';
import { shallow } from 'enzyme';
import InvestFooter from './InvestFooter';

describe('InvestFooter', () => {
  it('should render without crashing', () => {
    shallow(<InvestFooter />);
  });
});
