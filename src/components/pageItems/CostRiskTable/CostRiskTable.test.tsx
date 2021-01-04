import React from 'react';
import { shallow } from 'enzyme';
import CostRiskTable from './CostRiskTable';

describe('CostRiskTable', () => {
  it('should render without crashing', () => {
    shallow(<CostRiskTable />);
  });
});
