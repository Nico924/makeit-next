import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Price from './index';

storiesOf('newComponents/Price', module).add('Default', () => <Price />);
