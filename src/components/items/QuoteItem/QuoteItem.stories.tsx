// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import QuoteItem from './QuoteItem';

storiesOf('newComponents/QuoteItem', module).add('Default', () => <QuoteItem />);
