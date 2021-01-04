import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import JobIndividual from './JobIndividual';

storiesOf('newComponents/JobIndividual', module).add('Default', () => <JobIndividual />);
