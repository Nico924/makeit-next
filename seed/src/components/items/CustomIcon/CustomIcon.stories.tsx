
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object } from '@storybook/addon-knobs';

import CustomIcon from './CustomIcon';

storiesOf('seed/items/CustomIcon', module)
  .add('Default', () => (
    <CustomIcon
      icon={text('icon', 'user')}
      style={object('style', { color: '#333', fontSize: '20px' })}
    />
  ))
  .add('FontAwesome', () => (
    <CustomIcon
      icon={text('icon', 'user')}
      fontAwesome
      style={object('style', { color: '#333', fontSize: '20px' })}
    />
  ))
  .add('Project', () => (
    <CustomIcon
      icon={text('icon', 'star')}
      project
      style={object('style', { color: '#333', fontSize: '20px' })}
    />
  ));
