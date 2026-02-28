import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const defaultPassword = 'password123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const users = [
    {
      email: 'user@example.com',
      name: 'Normal User',
      role: 'user',
    },
    {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    },
    {
      email: 'superadmin@example.com',
      name: 'Super Admin User',
      role: 'super_admin',
    },
    {
      email: 'contractor@example.com',
      name: 'Contractor User',
      role: 'contractor',
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        role: userData.role,
        isActive: true,
      },
    });
    console.log(`Created/Updated user: ${user.email} with role: ${user.role}`);
  }

  console.log('Seed completed. Default password for all users is: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
