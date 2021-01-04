import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import BlogMain from './BlogMain';

storiesOf('newComponents/BlogMain', module).add('Default', () => <BlogMain />);
