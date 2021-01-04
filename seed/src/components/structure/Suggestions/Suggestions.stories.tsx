/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Suggestions from './Suggestions';

const dumbList = [
  { value: 'one', label: 'one' },
  { value: 'two', label: 'two' },
];

storiesOf('seed/structure/Suggestions', module).add('Test', () => (
  <Suggestions items={dumbList} filter>
    <div>Click me</div>
  </Suggestions>
));
