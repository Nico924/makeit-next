import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import LeftSub from './LeftSub';

storiesOf('newComponents/LeftSub', module).add('Default', () => <LeftSub />);
