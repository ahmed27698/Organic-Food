import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const email = "ahmedsamir7685@gmail.com";

const user = await prisma.user.update({
    where: { email },
    data: { role: "admin" },
});

console.log(`✓ ${user.email} is now role: ${user.role}`);
await prisma.$disconnect();
