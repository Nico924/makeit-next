import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Blog from './Blog';

storiesOf('newComponents/Blog', module).add('Default', () => <Blog />);
