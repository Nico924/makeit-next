import React from 'react';
import { shallow } from 'enzyme';
import CustomDropdown from './CustomDropdown';

describe('CustomDropdown', (): void => {
  it('should render without crashing', (): void => {
    shallow(<CustomDropdown />);
  });
});
