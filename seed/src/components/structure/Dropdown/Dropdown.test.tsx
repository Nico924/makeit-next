import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', (): void => {
  it('should render without crashing', (): void => {
    shallow(<Dropdown />);
  });
});
