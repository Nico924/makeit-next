// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import MachineCardItem from './MachineCardItem';

storiesOf('newComponents/MachineCardItem', module).add('Default', () => <MachineCardItem />);
