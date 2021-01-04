
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from './Loader';


storiesOf('seed/global/Loader', module).add('Loader', () => <Loader loader={{ active: true }} />);
