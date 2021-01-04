// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import App from './App';

storiesOf('newComponents/App', module).add('Default', () => <App />);
