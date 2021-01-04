import React from 'react';
import { shallow } from 'enzyme';
import MosaicStructure from './MosaicStructure';

describe('MosaicStructure', () => {
  it('should render without crashing', () => {
    shallow(<MosaicStructure />);
  });
});
