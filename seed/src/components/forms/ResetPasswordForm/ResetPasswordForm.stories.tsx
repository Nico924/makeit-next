import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ResetPasswordForm from './ResetPasswordForm';

storiesOf('newComponents/ResetPasswordForm', module).add('Default', () => <ResetPasswordForm />);
