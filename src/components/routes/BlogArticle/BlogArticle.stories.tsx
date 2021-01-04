import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import BlogArticle from './BlogArticle';

storiesOf('newComponents/BlogArticle', module).add('Default', () => <BlogArticle />);
