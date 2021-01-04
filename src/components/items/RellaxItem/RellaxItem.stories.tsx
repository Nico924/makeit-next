// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import RellaxItem from './RellaxItem';

storiesOf('newComponents/RellaxItem', module).add('Default', () => <RellaxItem />);
