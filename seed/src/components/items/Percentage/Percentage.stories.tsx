
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Percentage from './Percentage';


storiesOf('seed/items/Percentage', module).add('Percentage component', () => (
  <Percentage value="21" />
));
