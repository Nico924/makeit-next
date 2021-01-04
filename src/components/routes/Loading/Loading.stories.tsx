// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Loading from './Loading';

storiesOf('newComponents/Loading', module).add('Default', () => <Loading />);
