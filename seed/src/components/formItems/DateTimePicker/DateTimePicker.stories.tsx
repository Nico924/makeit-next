import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import DateTimePicker from './DateTimePicker';

storiesOf('newComponents/DateTimePicker', module).add('Default', () => <DateTimePicker />);
