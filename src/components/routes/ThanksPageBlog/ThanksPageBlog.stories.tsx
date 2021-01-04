import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import ThanksPageBlog from './ThanksPageBlog';

storiesOf('newComponents/ThanksPageBlog', module).add('Default', () => <ThanksPageBlog />);
