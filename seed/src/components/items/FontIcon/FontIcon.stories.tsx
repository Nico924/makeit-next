/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import FontIcon from './FontIcon';

storiesOf('seed/items/FontIcon', module).add('component', () => (
  <FontIcon name={text('Name', 'search')} />
));
