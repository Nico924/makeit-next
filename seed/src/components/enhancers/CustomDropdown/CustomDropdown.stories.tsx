
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CustomDropdown from './CustomDropdown';

storiesOf('newComponents/CustomDropdown', module).add('Default', (): JSX => <CustomDropdown />);
