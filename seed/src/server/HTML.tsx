/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { config } from 'config/general';

interface PropsT {
  children: any;
  css: string[];
  scripts: string[];
  state: string;
}
library.add(fas);

export default class HTML extends React.Component<PropsT> {
  static defaultProps = {
    css: [],
    links: [],
    scripts: [],
    state: '{}',
  };

  render(): JSX {
    const head = Helmet.renderStatic();
    const {
      children,
      scripts,
      css,
      fonts,
      state,
      styleElements,
      linkElements,
      scriptElements,
    } = this.props;

    return (
      <html lang="fr">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {css.map(
            (href, index): JSX => (
              <link key={index} rel="stylesheet" href={href} />
            ),
          )}
          {linkElements}
          {styleElements}
          {/* FontAwesome css */}
          <style>{dom.css()}</style>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${state}`,
            }}
          />
          {/* Head inline scripts */}
          {config.headScripts &&
            config.headScripts.map((item, index) => <script key={index} src={item} />)}
          {config.headFunctions &&
            config.headFunctions.map((item, index) => (
              <script dangerouslySetInnerHTML={{ __html: item }} key={index} />
            ))}
          {fonts &&
            fonts.map((href, index) => {
              if (!href) return false;
              return <link rel="preload" as="font" key={index} href={href} crossOrigin="true" />;
            })}
        </head>
        <body>
          {/* Body inline scripts */}
          {config.bodyScripts &&
            config.bodyScripts.map(
              (item, index): JSX => (
                <script dangerouslySetInnerHTML={{ __html: item }} key={index} />
              ),
            )}
          {/* Body inline noscript */}
          {config.bodyNoScripts &&
            config.bodyNoScripts.map((item, key) => (
              <noscript key={key} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          {/* App content */}
          <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
          {/* Body scripts */}
          {config.scripts &&
            config.scripts.map((item, index): JSX => <script key={index} src={item} />)}
          {/* App scripts */}
          {scripts.map(
            (src): JSX => (
              <script key={src} src={src} />
            ),
          )}
          {scriptElements}
        </body>
      </html>
    );
  }
}
