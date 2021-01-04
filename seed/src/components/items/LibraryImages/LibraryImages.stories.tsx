import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import LibraryImages from './LibraryImages';

storiesOf('newComponents/LibraryImages', module).add('Default', () => <LibraryImages />);
