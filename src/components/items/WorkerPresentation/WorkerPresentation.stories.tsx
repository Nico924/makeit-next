// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import WorkerPresentation from './WorkerPresentation';

storiesOf('newComponents/WorkerPresentation', module).add('Default', () => <WorkerPresentation />);
