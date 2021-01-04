import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import VideoArticleItem from './VideoArticleItem';

storiesOf('newComponents/VideoArticleItem', module).add('Default', () => <VideoArticleItem />);
