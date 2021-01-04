
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './Card';


storiesOf('seed/items/Card', module).add('Component', () => <Card title="test" />);
