import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Partners from './index';

storiesOf('newComponents/Partners', module).add('Default', () => <Partners />);
