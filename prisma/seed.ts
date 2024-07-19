import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      samples: {
        create: [
          {
            name: 'Sample 1',
            description: 'from human 1'
          },
          {
            name: 'Sample 2',
            description: 'from human 2'
          }
        ]
      }
    }
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      samples: {
        create: [
          {
            name: 'Sample 3',
            description: 'from human 3'
          },
          {
            name: 'Sample 4',
            description: 'from human 4'
          }
        ]
      }
    }
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
