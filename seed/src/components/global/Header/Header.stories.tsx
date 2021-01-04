import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Header from './Header';

storiesOf('newComponents/Header', module).add('Default', () => <Header />);
