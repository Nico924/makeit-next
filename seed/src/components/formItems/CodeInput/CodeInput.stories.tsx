import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CodeInput from './index';

storiesOf('newComponents/CodeInput', module).add('Default', () => <CodeInput />);
