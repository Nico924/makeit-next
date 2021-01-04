import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksPageSoftware from './index';

storiesOf('newComponents/ThanksPageSoftware', module).add('Default', () => <ThanksPageSoftware />);
