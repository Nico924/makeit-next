
import React from 'react';
import { shallow } from 'enzyme';
import Modal from './Modal';

describe('Modal', () => {
  it('should render without crashing', () => {
    shallow(<Modal dialogHide={() => {}} dialog={{}} />);
  });
});
