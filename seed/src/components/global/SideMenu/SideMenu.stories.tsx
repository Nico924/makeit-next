
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import SideMenu from './SideMenu';


storiesOf('seed/global/SideMenu', module).add('Side menu', () => (
  <SideMenu
    sideMenu={{
      id: select('direction', ['left', 'right'], 'left'),
      active: boolean('active', true),
      demo: true,
    }}
    appear
    sideMenuHide={() => {}}
  />
));
