import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestCard from './InvestCard';

storiesOf('newComponents/InvestCard', module).add('Default', () => <InvestCard />);
