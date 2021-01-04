import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksPage from './ThanksPage';

storiesOf('newComponents/ThanksPage', module).add('Default', () => <ThanksPage />);
