/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import BankAccount from './BankAccount';


storiesOf('seed/items/BankAccount', module).add('Normal', () => (
  <BankAccount value="BE651212121" />
));
