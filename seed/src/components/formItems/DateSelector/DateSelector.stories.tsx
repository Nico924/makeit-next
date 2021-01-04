
import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import { text, date, object, boolean } from '@storybook/addon-knobs';
import { required } from 'store/utils/validation';
import DateSelector from './DateSelector';

const defaultDate = new Date();

storiesOf('seed/formItems/DateSelector', module)
  .addDecorator(story => {
    
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('Custom', () => (
    <Field
      name="test"
      component={DateSelector}
      minDate={date('minDate', defaultDate)}
      disabled={boolean('disabled', false)}
      // For Form element in general
      noMargin={boolean('noMargin', false)}
      // For InputWrapper
      withBorder={boolean('withBorder', false)}
      withValueBorder={boolean('withValueBorder', false)}
      effect={boolean('effect', false)}
      small={boolean('small', false)}
      iconLeft={text('iconLeft', '')}
      iconRight={text('iconRight', '')}
      // For label
      label={text('label', 'Label')}
      labelIcon={text('labelIcon', '')}
      // styling
      fieldWrapperStyle={object('fieldWrapperStyle', {})}
      labelStyle={object('labelStyle', {})}
      labelIconStyle={object('labelIconStyle', {})}
      valueStyle={object('valueStyle', {})}
      iconLeftStyle={object('iconLeftStyle', {})}
      iconRightStyle={object('iconRightStyle', {})}
      validate={required}
    />
  ))
  .add('Icon left', () => (
    <Field
      name="test"
      component={DateSelector}
      // For InputWrapper
      withBorder
      iconLeft={text('iconLeft', 'calendar')}
    />
  ))
  .add('Icon value left', () => (
    <Field
      name="test"
      component={DateSelector}
      // For InputWrapper
      label="Label"
      labelIcon="calendar"
      withValueBorder
      iconLeft={text('iconLeft', 'calendar')}
    />
  ));
