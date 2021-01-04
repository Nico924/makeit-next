// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Login from './Login';

storiesOf('newComponents/Login', module).add('Default', () => <Login />);
