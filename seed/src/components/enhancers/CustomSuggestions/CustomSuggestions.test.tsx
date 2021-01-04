import React from 'react';
import { shallow } from 'enzyme';
import CustomSuggestions from './CustomSuggestions';

describe('CustomSuggestions', () => {
  it('should render without crashing', () => {
    const itemComponent = () => {};
    const EnhancedComp = CustomSuggestions(itemComponent);
    shallow(
      <EnhancedComp
        input={{ value: {} }}
        defaultValue="any"
        searchValue="any"
        items={[]}
        textKey="text"
      />,
    );
  });
});
