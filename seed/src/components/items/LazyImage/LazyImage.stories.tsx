import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import LazyImage from './LazyImage';

storiesOf('newComponents/LazyImage', module).add('Default', () => <LazyImage />);
