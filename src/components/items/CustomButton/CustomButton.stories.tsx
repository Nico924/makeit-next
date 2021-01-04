// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CustomButton from './CustomButton';

storiesOf('newComponents/CustomButton', module).add('Default', () => <CustomButton />);
