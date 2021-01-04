import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Software from './index';

storiesOf('newComponents/Software', module).add('Default', () => <Software />);
