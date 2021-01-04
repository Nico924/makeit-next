
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import PhoneNumber from './PhoneNumber';


storiesOf('seed/items/PhoneNumber', module).add('Component', () => (
  <PhoneNumber value="+32474360900" />
));
