import { PrismaClient } from '@prisma/client';

declare global {
  var _prisma: PrismaClient | undefined;
}

const prisma = global._prisma || new PrismaClient();

if (!import.meta.env.PROD) {
  global._prisma = prisma;
}

export default prisma;
