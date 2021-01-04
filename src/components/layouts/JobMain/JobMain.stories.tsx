import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import JobMain from './JobMain';

storiesOf('newComponents/JobMain', module).add('Default', () => <JobMain />);
