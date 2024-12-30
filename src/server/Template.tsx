import React from 'react';

const Template: React.FC<{
  head?: React.ReactNode;
  title?: string;
  id?: string;
  className?: string;
  contents?: React.ReactNode;
  data?: any;
  js?: React.ReactNode;
}> = (props) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
        <title>{(props?.title ? `${props.title} | ` : '') + 'サンプルブログ'}</title>
        {import.meta.env.PROD ? (
          <link href="/static/css/style.css" rel="stylesheet" />
        ) : (
          <link href="/src/styles/style.scss" rel="stylesheet" />
        )}
        {props?.head}
      </head>

      <body id={props?.id} className={props?.className}>
        {props?.contents && <main>{props.contents}</main>}

        {props?.data && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_DATA__ = ${JSON.stringify(props.data)};`,
            }}
          />
        )}

        {props?.js}
      </body>
    </html>
  );
};

export default Template;
