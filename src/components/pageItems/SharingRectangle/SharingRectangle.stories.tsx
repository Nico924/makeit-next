import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import SharingRectangle from './SharingRectangle';

storiesOf('newComponents/SharingRectangle', module).add('Default', () => <SharingRectangle />);
