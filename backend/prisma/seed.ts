import "dotenv/config";
import { prisma } from "../src/config/prisma";
import { hashPassword } from "../src/utils/password";

const email = process.env.SEED_USER_EMAIL || "test@example.com";
const password = process.env.SEED_USER_PASSWORD || "Test@12345";

const main = async () => {
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN" },
    create: { email, passwordHash, role: "ADMIN" },
  });

  console.log(`Seeded user: ${user.email} (${user.role})`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });