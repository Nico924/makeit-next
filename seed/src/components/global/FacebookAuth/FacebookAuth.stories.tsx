import React from 'react';
import { storiesOf } from '@storybook/react';
import {} from '@storybook/addon-knobs';

import FacebookAuth from './FacebookAuth';

storiesOf('seed/global/FacebookAuth', module).add('Default', (): void => (
  <FacebookAuth config={{ appId: '1234' }} />
));
