import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import TextItemList from './TextItemList';

storiesOf('newComponents/TextItemList', module).add('Default', () => <TextItemList />);
