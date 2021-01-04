
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { text, object, color, dom, array } from '@storybook/addon-knobs';

import GoogleAuth from './GoogleAuth';

storiesOf('seed/global/GoogleAuth', module).add('Default', () => (
  <GoogleAuth loginGoogle={() => {}} config={{ auth: '1234' }} />
));
