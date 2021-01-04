import express from 'express';
import chalk from 'chalk';
import path from 'path';
import manifestHelpers from 'express-manifest-helpers';

import robotsTxt from 'static/robots.txt';
import serverRenderer from './render';
import { handleServer } from './utils';

const clientBuild = 'ssr/client';
const publicPath = '/';
const staticFolder = path.resolve(clientBuild);

const app = express();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
if (process.env.NODE_ENV === 'development') {
  app.use(publicPath, express.static(staticFolder));
}
// temporary solution to test build
else {
  app.use(publicPath, express.static(staticFolder));
}

handleServer(app, robotsTxt);

// The manifest is used to make the server know the js/css files
const manifestPath = staticFolder;

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  }),
);

app.use(serverRenderer());

app.listen(process.env.PORT || 8500, (): void => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`),
  );
});

export default app;
