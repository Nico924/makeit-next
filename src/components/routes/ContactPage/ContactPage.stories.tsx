import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ContactPage from './index';

storiesOf('newComponents/ContactPage', module).add('Default', () => <ContactPage />);
