/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';

import Button from './Button';

storiesOf('seed/items/Button', module).add('Custom', () => (
  <Button
    action={action('clicked')}
    color={select('color', ['red', 'green', 'blue', 'default'], 'default')}
    shadow={boolean('shadow', true)}
    noMargin={boolean('noMargin', true)}
    relative={boolean('relative', true)}
    squared={boolean('squared', true)}
    label={text('label', 'Button')}
    iconLeft={text('iconLeft', '')}
    iconRight={text('iconRight', '')}
    icon={text('fa icon', '')}
  />
));
