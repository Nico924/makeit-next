import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksIdeaApplication from './index';

storiesOf('newComponents/ThanksIdeaApplication', module).add('Default', () => <ThanksIdeaApplication />);
