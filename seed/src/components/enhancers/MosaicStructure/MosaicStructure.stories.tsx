
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import MosaicStructure from './MosaicStructure';

storiesOf('newComponents/MosaicStructure', module).add('Default', () => <MosaicStructure />);
