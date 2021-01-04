import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ProjectInput from './ProjectInput';

storiesOf('newComponents/ProjectInput', module).add('Default', () => <ProjectInput />);
