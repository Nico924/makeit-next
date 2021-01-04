import React from 'react';
import { shallow } from 'enzyme';
import InvestHeader from './InvestHeader';

describe('InvestHeader', () => {
  it('should render without crashing', () => {
    shallow(<InvestHeader />);
  });
});
