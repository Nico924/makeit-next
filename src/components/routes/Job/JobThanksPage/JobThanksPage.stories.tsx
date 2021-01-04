import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import JobThanksPage from './JobThanksPage';

storiesOf('newComponents/JobThanksPage', module).add('Default', () => <JobThanksPage />);
