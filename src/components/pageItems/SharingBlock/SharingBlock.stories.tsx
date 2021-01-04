import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import SharingBlock from './SharingBlock';

storiesOf('newComponents/SharingBlock', module).add('Default', () => <SharingBlock />);
