/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import Modal from './index';

storiesOf('seed/global/Modal', module)
  .add('Custom', () => (
    <Modal
      dialog={{
        id: select('type', ['success', 'error'], 'success'),
        active: boolean('active', true),
        title: text('title', 'Title'),
        messages: text('message', 'Message'),
      }}
    />
  ))
  .add('Confirm', () => (
    <Modal
      dialog={{
        id: 'confirm',
        active: boolean('active', true),
        title: text('title', 'Title'),
        messages: text('message', 'Message'),
        action: {
          text: text('action', 'Ok'),
          value: () => {},
        },
        close: {
          text: text('close', 'Close'),
          value: () => {},
        },
      }}
    />
  ));
