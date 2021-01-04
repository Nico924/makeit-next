import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import StartWith from './StartWith';

storiesOf('newComponents/StartWith', module).add('Default', () => <StartWith />);
