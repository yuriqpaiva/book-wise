import { PrismaClient } from '@prisma/client';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const prisma = new PrismaClient({
  log: isDevelopment ? ['query'] : [],
});
