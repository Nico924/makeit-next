import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestingInIdeas from './InvestingInIdeas';

storiesOf('newComponents/InvestingInIdeas', module).add('Default', () => <InvestingInIdeas />);
