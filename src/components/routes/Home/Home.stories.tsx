// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Home from './Home';

storiesOf('newComponents/Home', module).add('Default', () => <Home />);
