import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import BusinessPrototypingMain from './BusinessPrototypingMain';

storiesOf('newComponents/BusinessPrototypingMain', module).add('Default', () => <BusinessPrototypingMain />);
