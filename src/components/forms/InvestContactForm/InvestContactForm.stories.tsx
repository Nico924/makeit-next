import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestContactForm from './InvestContactForm';

storiesOf('newComponents/InvestContactForm', module).add('Default', () => <InvestContactForm />);
