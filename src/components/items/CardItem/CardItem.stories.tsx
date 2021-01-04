// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import CardItem from './CardItem';

storiesOf('newComponents/CardItem', module).add('Default', () => <CardItem />);
