import React from 'react';
import { shallow } from 'enzyme';
import WorkerPresentation from './WorkerPresentation';

describe('WorkerPresentation', () => {
  it('should render without crashing', () => {
    shallow(<WorkerPresentation />);
  });
});
