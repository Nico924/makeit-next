import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ContactForm from './ContactForm';

storiesOf('newComponents/ContactForm', module).add('Default', () => <ContactForm />);
