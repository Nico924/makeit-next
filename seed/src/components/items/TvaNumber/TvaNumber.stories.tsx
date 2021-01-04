
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import TvaNumber from './TvaNumber';


storiesOf('seed/items/TvaNumber', module).add('Component', () => <TvaNumber value="001212122" />);
