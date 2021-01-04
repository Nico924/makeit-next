import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import FileStackInput from './FileStackInput';

storiesOf('newComponents/FileStackInput', module).add('Default', () => <FileStackInput />);
