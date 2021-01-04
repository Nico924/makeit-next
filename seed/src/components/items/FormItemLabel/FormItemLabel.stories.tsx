import React from 'react';
import { storiesOf } from '@storybook/react';
// import { text, object, color, dom, array } from '@storybook/addon-knobs';

import FormItemLabel from './FormItemLabel';

storiesOf('seed/items/FormItemLabel', module).add('Default', () => <FormItemLabel label="Hello" />);
