import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import QuoteArticleItem from './QuoteArticleItem';

storiesOf('newComponents/QuoteArticleItem', module).add('Default', () => <QuoteArticleItem />);
