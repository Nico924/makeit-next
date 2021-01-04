import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import BlogItem from './BlogItem';

storiesOf('newComponents/BlogItem', module).add('Default', () => <BlogItem />);
