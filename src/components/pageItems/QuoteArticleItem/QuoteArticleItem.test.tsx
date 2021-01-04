import React from 'react';
import { shallow } from 'enzyme';
import QuoteArticleItem from './QuoteArticleItem';

describe('QuoteArticleItem', () => {
  it('should render without crashing', () => {
    shallow(<QuoteArticleItem />);
  });
});
