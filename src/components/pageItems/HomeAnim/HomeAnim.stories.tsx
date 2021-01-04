// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import HomeAnim from './HomeAnim';

storiesOf('newComponents/HomeAnim', module).add('Default', () => <HomeAnim />);
