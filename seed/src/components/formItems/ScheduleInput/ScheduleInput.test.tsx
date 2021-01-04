import React from 'react';
import { shallow } from 'enzyme';
import ScheduleInput from './ScheduleInput';

describe('ScheduleInput', () => {
  it('should render without crashing', () => {
    shallow(<ScheduleInput />);
  });
});
