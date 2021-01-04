import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm, Field } from 'redux-form';
import { text, boolean, number, object } from '@storybook/addon-knobs';
import { required } from 'store/utils/validation';
import Textarea from './Textarea';

storiesOf('seed/formItems/Textarea', module)
  .addDecorator(story => {
    const Wrapper = reduxForm({ form: 'test' })(() => story());
    return <Wrapper />;
  })
  .add('default', () => <Field name="test" component={Textarea} label={text('label', 'Input')} />)
  .add('Custom', () => (
    <Field
      name="test"
      placeholder={text('placeholder', '')}
      disabled={boolean('disabled', false)}
      component={Textarea}
      rows={number('rows', 3)}
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
  ));
