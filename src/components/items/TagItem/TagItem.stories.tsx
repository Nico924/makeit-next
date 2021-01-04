import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import TagItem from './TagItem';

storiesOf('newComponents/TagItem', module).add('Default', () => <TagItem />);
