
import React from 'react';
import { shallow } from 'enzyme';
import Cropper from './Cropper';

describe('Cropper', (): void => {
  it('should render without crashing', (): void => {
    shallow(<Cropper src="" />);
  });
});
