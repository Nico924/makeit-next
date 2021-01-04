import React from 'react';
import { shallow } from 'enzyme';
import SharingRectangle from './SharingRectangle';

describe('SharingRectangle', () => {
  it('should render without crashing', () => {
    shallow(<SharingRectangle />);
  });
});
