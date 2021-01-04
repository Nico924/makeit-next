import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import About from './About';

storiesOf('newComponents/About', module).add('Default', () => <About />);
