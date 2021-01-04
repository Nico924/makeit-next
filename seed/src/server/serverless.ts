import express from 'express';

import serverless from 'serverless-http';

import path from 'path';

import robotsTxt from 'static/robots.txt';
// import document from 'global/document';
import serverRenderer from './renderSls';
import { handleServer } from './utils';

// global.document = document;

const clientBuild = 'sls/client'; // config.frontUrl;
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
  app.use(publicPath, express.static('/front'));
}

handleServer(app, robotsTxt);

app.use('/', serverRenderer());

const server = serverless(app);

const handler = async (event: any, context: any) => {
  // you can do other things here
  const result = await server(event, context);
  // and here
  return result;
};

export { handler };

export default handler;
