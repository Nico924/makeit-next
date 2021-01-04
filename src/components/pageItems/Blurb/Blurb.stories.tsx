import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Blurb from './Blurb';

storiesOf('newComponents/Blurb', module).add('Default', () => <Blurb />);
