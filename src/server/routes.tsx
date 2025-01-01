import React from 'react';
import { renderToString } from 'react-dom/server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import prisma from '@/server/db';
import Template from './Template';

const routes = new Hono();

if (import.meta.env.PROD) {
  routes.use('/client/*', serveStatic({ root: './' }));
  routes.use('/static/*', serveStatic({ root: './' }));
}

routes.get('/api/clock', (c) => {
  return c.json({
    var: '',
    time: new Date().toLocaleTimeString(),
  });
});

routes.get('/hoge', (c) => {
  return c.html(
    renderToString(
      <Template
        title="hoge"
        contents={<div id="root"></div>}
        js={<script type="module" src={import.meta.env.PROD ? '/client/hoge.c.js' : '/src/client/hoge.tsx'}></script>}
      />,
    ),
  );
});

routes.get('/fuga', (c) => {
  return c.html(
    renderToString(
      <Template
        title="fuga"
        contents={<div id="root"></div>}
        js={<script type="module" src={import.meta.env.PROD ? '/client/fuga.c.js' : '/src/client/fuga.tsx'}></script>}
      />,
    ),
  );
});

routes.get('/db', async (c) => {
  const categories = await prisma.category.findMany();

  return c.html(
    renderToString(
      <Template
        title="db"
        contents={
          <React.Fragment>
            {categories.map((category) => (
              <div key={category.id}>
                {category.id}:{category.name}
              </div>
            ))}
          </React.Fragment>
        }
      />,
    ),
  );
});

routes.get('*', (c) => {
  return c.html(
    renderToString(
      <Template
        contents={<div id="root"></div>}
        js={
          <script
            type="module"
            src={import.meta.env.PROD ? '/client/welcome.c.js' : '/src/client/welcome.tsx'}
          ></script>
        }
      />,
    ),
  );
});

export default routes;
