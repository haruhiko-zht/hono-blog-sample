import { renderToString } from 'react-dom/server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { PrismaClient } from '@prisma/client';
import Template from './Template';

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();

app.use('/client/*', serveStatic({ root: './' }));
app.use('/static/*', serveStatic({ root: './' }));

app.get('/api/clock', (c) => {
  return c.json({
    var: c.env.MY_VAR, // Cloudflare Bindings
    time: new Date().toLocaleTimeString(),
  });
});

app.get('/hoge', (c) => {
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

app.get('/fuga', (c) => {
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

app.get('/db', async (c) => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany();
  prisma.$disconnect();

  return c.html(
    renderToString(
      <Template
        title="db"
        contents={
          <>
            {categories.map((category) => (
              <div>
                {category.id}:{category.name}
              </div>
            ))}
          </>
        }
      />,
    ),
  );
});

app.get('*', (c) => {
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

export default app;
