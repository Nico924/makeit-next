import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import SwitchInput from './SwitchInput';

storiesOf('newComponents/SwitchInput', module).add('Default', () => <SwitchInput />);
