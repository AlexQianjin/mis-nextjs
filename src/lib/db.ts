import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
const prismaAdapter = PrismaAdapter(prisma);

export default prisma;
export { prismaAdapter };

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
