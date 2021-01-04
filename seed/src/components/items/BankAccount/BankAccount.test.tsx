import React from 'react';
import { shallow } from 'enzyme';
import BankAccount from './BankAccount';

describe('BankAccount', () => {
  it('should render without crashing', () => {
    shallow(<BankAccount value="BE651212121" />);
  });
});
