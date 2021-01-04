
import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from './SideMenu';

describe('SideMenu', () => {
  it('should render without crashing', () => {
    shallow(
      <SideMenu
        sideMenu={{
          id: 'right',
        }}
        sideMenuHide={() => {}}
      />,
    );
  });
});
