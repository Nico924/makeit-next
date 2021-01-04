import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import PrivacyPolicy from './PrivacyPolicy';

storiesOf('newComponents/PrivacyPolicy', module).add('Default', () => <PrivacyPolicy />);
