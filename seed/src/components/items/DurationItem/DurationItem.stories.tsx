import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import DurationItem from './DurationItem';

storiesOf('newComponents/DurationItem', module).add('Default', () => <DurationItem />);
