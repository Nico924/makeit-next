import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Job from './Job';

storiesOf('newComponents/Job', module).add('Default', () => <Job />);
