import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksPageStaas from './ThanksPageStaas';

storiesOf('newComponents/ThanksPageStaas', module).add('Default', () => <ThanksPageStaas />);
