/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Amount from './Amount';


storiesOf('seed/items/Amount', module).add('Amount component', () => <Amount value={1000} />);
