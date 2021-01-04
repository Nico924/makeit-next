import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThankYouAgenda from './ThankYouAgenda';

storiesOf('newComponents/ThankYouAgenda', module).add('Default', () => <ThankYouAgenda />);
