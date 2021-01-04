import React from 'react';
import { shallow } from 'enzyme';
import LibraryImages from './LibraryImages';

describe('LibraryImages', () => {
  it('should render without crashing', () => {
    shallow(<LibraryImages />);
  });
});
