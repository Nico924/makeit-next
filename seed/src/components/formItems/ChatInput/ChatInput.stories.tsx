import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ChatInput from './ChatInput';

storiesOf('newComponents/ChatInput', module).add('Default', () => <ChatInput />);
