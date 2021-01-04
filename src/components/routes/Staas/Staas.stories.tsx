import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Staas from './Staas';

storiesOf('newComponents/Staas', module).add('Default', () => <Staas />);
