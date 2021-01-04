import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThankYou from './ThankYou';

storiesOf('newComponents/ThankYou', module).add('Default', () => <ThankYou />);
