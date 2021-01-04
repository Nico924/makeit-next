import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import TagsInput from './TagsInput';

storiesOf('newComponents/TagsInput', module).add('Default', () => <TagsInput />);
