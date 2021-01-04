import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ParkPlace from './ParkPlace';

storiesOf('newComponents/ParkPlace', module).add('Default', () => <ParkPlace />);
