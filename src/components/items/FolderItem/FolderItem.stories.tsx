import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import FolderItem from './FolderItem';

storiesOf('newComponents/FolderItem', module).add('Default', () => <FolderItem />);
