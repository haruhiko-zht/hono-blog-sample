import { Hono } from 'hono';
import prisma from './db';
import routes from './routes';

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();

app.route('/', routes);

async function gracefulShutdown() {
  await prisma.$disconnect();
  console.log('Prisma disconnected');
  process.exit(0);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default app;
