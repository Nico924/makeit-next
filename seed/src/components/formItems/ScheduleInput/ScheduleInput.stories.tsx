import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ScheduleInput from './ScheduleInput';

storiesOf('newComponents/ScheduleInput', module).add('Default', () => <ScheduleInput />);
