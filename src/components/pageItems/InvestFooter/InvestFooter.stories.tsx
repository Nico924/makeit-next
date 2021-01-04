import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestFooter from './InvestFooter';

storiesOf('newComponents/InvestFooter', module).add('Default', () => <InvestFooter />);
