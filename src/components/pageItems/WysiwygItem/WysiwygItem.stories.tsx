import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import WysiwygItem from './WysiwygItem';

storiesOf('newComponents/WysiwygItem', module).add('Default', () => <WysiwygItem />);
