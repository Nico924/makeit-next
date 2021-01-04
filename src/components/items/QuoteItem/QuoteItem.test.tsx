import React from 'react';
import { shallow } from 'enzyme';
import QuoteItem from './QuoteItem';

describe('QuoteItem', () => {
  it('should render without crashing', () => {
    shallow(<QuoteItem />);
  });
});
