
import React from 'react';
import { shallow } from 'enzyme';
import TextItem from './TextItem';

describe('TextItem', () => {
  it('should render without crashing', () => {
    shallow(<TextItem lg="en" defaultLg="en" content={null} />);
  });
});
