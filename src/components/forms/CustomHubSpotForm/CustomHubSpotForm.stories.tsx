import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CustomHubSpotForm from './CustomHubSpotForm';

storiesOf('newComponents/CustomHubSpotForm', module).add('Default', () => <CustomHubSpotForm />);
