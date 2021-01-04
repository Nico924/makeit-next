// Polyfills
import * as React from 'react';

// Storybook
import { configure, addDecorator } from '@storybook/react';
// React router
import StoryRouter from 'storybook-react-router';
// Edit properties
import { withKnobs } from '@storybook/addon-knobs/react';
// Special options
import { withOptions } from '@storybook/addon-options';
// Check compliance
// import { checkA11y } from '@storybook/addon-a11y';
// Add notes
import { withNotes } from '@storybook/addon-notes';
// Viewport
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// Background
import { withBackgrounds } from '@storybook/addon-backgrounds';

// Style
import 'styles/seedMain.scss';

// Global components
import Modals from 'components/global/Modals';
import Loader from 'components/global/Loader';
// FONT AWESOME
import { library } from '@fortawesome/fontawesome-svg-core';
// free icons
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// store
import { Provider } from 'react-redux';

import setupStore from 'store/setup';

import rootSaga from 'store/rootSaga';
import { routerMiddleware } from 'connected-react-router';

// Config icons
library.add(fab, fas, far);

const setup = setupStore({});
// run saga
setup.sagaRun(rootSaga);

const appDecorator = storyFn => (
  <Provider store={setup.store}>
    <div>
      <Modals />
      <Loader />
      <div style={{ padding: 20, height: '100vh' }}>
        <div style={{ transform: 'translate(0)', height: '100%', width: '100%' }}>{storyFn()}</div>
      </div>
    </div>
  </Provider>
);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
const reqParent = require.context('../../src', true, /.stories.js$/);
// can be empty
let reqDahboard;
try {
  reqDahboard = require.context('../../admin', true, /.stories.js$/);
} catch (e) {
  // continue
}

function loadStories() {
  req.keys().forEach(filename => req(filename));
  reqParent.keys().forEach(filename => reqParent(filename));
  if (reqDahboard) reqDahboard.keys().forEach(filename => reqDahboard(filename));
}

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
});
addDecorator(
  withOptions({
    /* name: 'CRA Kitchen Sink',
    goFullScreen: false,
    showAddonsPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\./,
    hierarchyRootSeparator: /\|/,
    enableShortcuts: true, */
  }),
);
addDecorator(
  withBackgrounds([
    { name: 'white', value: '#FFF' },
    { name: 'dark', value: '#333' },
    { name: 'grey', value: '#BBB' },
  ]),
);
// addDecorator(checkA11y);
addDecorator(appDecorator);
addDecorator(withKnobs);
addDecorator(withNotes);
addDecorator(StoryRouter());

// Configure
configure(loadStories, module);
