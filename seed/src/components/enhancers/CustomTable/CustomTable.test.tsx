import React from 'react';
import { shallow } from 'enzyme';
import CustomTable from './CustomTable';

describe('CustomTable', () => {
  it('should render without crashing', () => {
    const ItemComponent = () => {};
    const EnhancedComp = CustomTable(ItemComponent);
    shallow(
      <EnhancedComp head={{ key: '1', type: '', props: {}, ref: {} }} headers={[{}]} items={[]} />,
    );
  });
});
