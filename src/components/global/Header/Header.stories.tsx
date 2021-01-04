// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './index';

// $FlowFixMe
storiesOf('app/global/Header', module).add('Header', () => <Header />);
