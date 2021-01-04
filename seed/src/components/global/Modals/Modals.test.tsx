
import React from 'react';
import { shallow } from 'enzyme';
import Modals from './Modals';

describe('Modals', () => {
  it('should render without crashing', () => {
    shallow(
      <Modals
        dialogs={{ confirm: { id: 'confirm', active: true, title: 'Title', messages: 'Message' } }}
      />,
    );
  });
});
