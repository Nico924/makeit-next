import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CostRiskTable from './CostRiskTable';

storiesOf('newComponents/CostRiskTable', module).add('Default', () => <CostRiskTable />);
