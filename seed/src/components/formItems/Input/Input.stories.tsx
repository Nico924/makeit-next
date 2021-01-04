import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array, boolean } from '@storybook/addon-knobs';
import { Form, Field } from 'react-final-form';
import { required } from 'store/utils/validation';

import Input from './Input';

storiesOf('seed/formItems/Input', module)
  .addDecorator(story => {
    const Wrapper = <Form render={story} />;
    return <Wrapper />;
  })
  .add('default', () => <Field name="test" component={Input} label="Input" />)
  .add('custom', () => (
    <Field
      name="test"
      component={Input}
      placeholder={text('placeholder', '')}
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
      errorStyle={object('errorStyle', {})}
      // other
      validate={required}
    />
  ));
