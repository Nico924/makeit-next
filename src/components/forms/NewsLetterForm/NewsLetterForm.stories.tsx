import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import NewsLetterForm from './NewsLetterForm';

storiesOf('newComponents/NewsLetterForm', module).add('Default', () => <NewsLetterForm />);
