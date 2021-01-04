import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, color, dom, array } from '@storybook/addon-knobs';

import Page404 from './Page404';

storiesOf('newComponents/Page404', module).add('Default', () => <Page404 />);
