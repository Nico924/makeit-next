import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ProfileForm from './ProfileForm';

storiesOf('newComponents/ProfileForm', module).add('Default', () => <ProfileForm />);
