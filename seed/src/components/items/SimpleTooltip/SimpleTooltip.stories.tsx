import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import SimpleTooltip from './SimpleTooltip';

storiesOf('newComponents/SimpleTooltip', module).add('Default', () => <SimpleTooltip />);
