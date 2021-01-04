import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestingInIdeasOnboarding from './InvestingInIdeasOnboarding';

storiesOf('newComponents/InvestingInIdeasOnboarding', module).add('Default', () => <InvestingInIdeasOnboarding />);
