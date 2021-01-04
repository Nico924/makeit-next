import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CustomMarketingForm from './CustomMarketingForm';

storiesOf('newComponents/CustomMarketingForm', module).add('Default', () => <CustomMarketingForm />);
