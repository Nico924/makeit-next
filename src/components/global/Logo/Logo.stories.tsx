// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Logo from './Logo';

storiesOf('newComponents/Logo', module).add('Default', () => <Logo />);
