import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import VideoItem from './VideoItem';

storiesOf('newComponents/VideoItem', module).add('Default', () => <VideoItem />);
