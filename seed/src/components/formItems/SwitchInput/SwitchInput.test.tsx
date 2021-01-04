
import React from 'react';
import { shallow } from 'enzyme';
import SwitchInput from './SwitchInput';

describe('SwitchInput', () => {
  it('should render without crashing', () => {
    shallow(<SwitchInput />);
  });
});
