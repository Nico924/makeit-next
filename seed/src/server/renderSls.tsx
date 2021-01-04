import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';

import Html from './HTML';

import { handleRender } from './utils';

export const serverRenderer = () => async (req, res): void => {
  const { content, state, scriptElements, linkElements, styleElements } = await handleRender(
    req,
    res,
    true,
  );

  // very important or it sents plain text
  res.setHeader('content-type', 'text/html');
  res.write('<!DOCTYPE html>');
  renderToNodeStream(
    <Html
      // fonts={[manifest['fonts/icons.woff']]}
      // css={[manifest['bundle.css']]}
      // scripts={[manifest['runtime.js'], manifest['bundle.js'], manifest['vendor.js']]}
      // state={state}
      scriptElements={scriptElements}
      linkElements={linkElements}
      styleElements={styleElements}
      state={state}
    >
      {content}
    </Html>,
  ).pipe(res);

  /*
  return res.send(
    `<!DOCTYPE html>${renderToString(
      <Html
        css={[`${manifest['bundle.css']}`]}
        scripts={[manifest['runtime.js'], manifest['bundle.js'], manifest['vendor.js']]}
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
