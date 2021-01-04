import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksSourcing from './ThanksSourcing';

storiesOf('newComponents/ThanksSourcing', module).add('Default', () => <ThanksSourcing />);
