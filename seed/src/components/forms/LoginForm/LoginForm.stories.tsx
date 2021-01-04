import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import LoginForm from './LoginForm';

storiesOf('newComponents/LoginForm', module).add('Default', () => <LoginForm />);
