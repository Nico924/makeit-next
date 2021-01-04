import React from 'react';
import { shallow } from 'enzyme';
import SharingBlock from './SharingBlock';

describe('SharingBlock', () => {
  it('should render without crashing', () => {
    shallow(<SharingBlock />);
  });
});
