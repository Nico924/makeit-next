import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';

import Html from './HTML';
import { handleRender } from './utils';

export const serverRenderer = () => async (req, res): void => {
  const { content, state, scriptElements, linkElements, styleElements } = await handleRender(
    req,
    res,
  );

  res.setHeader('content-type', 'text/html');
  res.write('<!DOCTYPE html>');

  renderToNodeStream(
    <Html
      // fonts={[res.locals.assetPath('fonts/icons.woff')]}
      // css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
      // scripts={[
      //   res.locals.assetPath('runtime.js'),
      //   res.locals.assetPath('bundle.js'),
      //   res.locals.assetPath('vendor.js'),
      // ]}
      scriptElements={scriptElements}
      linkElements={linkElements}
      styleElements={styleElements}
      state={state}
    >
      {content}
    </Html>,
  ).pipe(res);

  /*
  res.send(
    `<!DOCTYPE html>${renderToString(
      <Html
        css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
        scripts={[
          res.locals.assetPath('runtime.js'),
          res.locals.assetPath('bundle.js'),
          res.locals.assetPath('vendor.js'),
        ]}
        state={state}
      >
        {content}
      </Html>,
    )}`,
  );
  */

  //= 1st render
};

export default serverRenderer;
