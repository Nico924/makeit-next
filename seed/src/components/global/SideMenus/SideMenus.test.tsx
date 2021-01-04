
import React from 'react';
import { shallow } from 'enzyme';
import SideMenus from './SideMenus';

describe('SideMenus', () => {
  it('should render without crashing', () => {
    shallow(<SideMenus sideMenus={{}} />);
  });
});
