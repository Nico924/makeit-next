import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InlineContactForm from './InlineContactForm';

storiesOf('newComponents/InlineContactForm', module).add('Default', () => <InlineContactForm />);
