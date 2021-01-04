import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ProjectRadio from './ProjectRadio';

storiesOf('newComponents/ProjectRadio', module).add('Default', () => <ProjectRadio />);
