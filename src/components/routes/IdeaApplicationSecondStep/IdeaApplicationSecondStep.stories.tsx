import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import IdeaApplicationSecondStep from './IdeaApplicationSecondStep';

storiesOf('newComponents/IdeaApplicationSecondStep', module).add('Default', () => <IdeaApplicationSecondStep />);
