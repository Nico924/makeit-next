import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Main from './Main';

storiesOf('newComponents/Main', module).add('Default', () => <Main />);
