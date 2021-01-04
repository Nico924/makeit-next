import React from 'react';
import { shallow } from 'enzyme';
import MachineCardItem from './MachineCardItem';

describe('MachineCardItem', () => {
  it('should render without crashing', () => {
    shallow(<MachineCardItem />);
  });
});
