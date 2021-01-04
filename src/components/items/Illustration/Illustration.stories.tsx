import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Illustration from './Illustration';

storiesOf('newComponents/Illustration', module).add('Default', () => <Illustration />);
