import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CustomArticle from './CustomArticle';

storiesOf('newComponents/CustomArticle', module).add('Default', () => <CustomArticle />);
