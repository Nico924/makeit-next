
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import DateItem from './DateItem';


storiesOf('seed/items/DateItem', module).add('Date Item component', () => (
  <DateItem date={new Date().toISOString()} />
));
