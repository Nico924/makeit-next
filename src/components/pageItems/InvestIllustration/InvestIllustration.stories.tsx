import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import InvestIllustration from './InvestIllustration';

storiesOf('newComponents/InvestIllustration', module).add('Default', () => <InvestIllustration />);
