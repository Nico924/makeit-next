import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Sourcing from './Sourcing';

storiesOf('newComponents/Sourcing', module).add('Default', () => <Sourcing />);
