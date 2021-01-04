import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Section from './Section';

storiesOf('newComponents/Section', module).add('Default', () => <Section />);
