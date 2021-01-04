import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import IdeaApplication from './IdeaApplication';

storiesOf('newComponents/IdeaApplication', module).add('Default', () => <IdeaApplication />);
