// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Menu from './Menu';

storiesOf('newComponents/Menu', module).add('Default', () => <Menu />);
