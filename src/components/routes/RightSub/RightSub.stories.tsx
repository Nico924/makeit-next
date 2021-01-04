// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import RightSub from './RightSub';

storiesOf('newComponents/RightSub', module).add('Default', () => <RightSub />);
