import React from 'react';
import { shallow } from 'enzyme';
import FolderItem from './FolderItem';

describe('FolderItem', () => {
  it('should render without crashing', () => {
    shallow(<FolderItem />);
  });
});
