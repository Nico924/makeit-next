import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import TestimonialCard from './TestimonialCard';

storiesOf('newComponents/TestimonialCard', module).add('Default', () => <TestimonialCard />);
