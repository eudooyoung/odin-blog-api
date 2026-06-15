import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcryptjs";

const main = async () => {
  await prisma.$transaction(async (tx) => {
    await tx.user.deleteMany({});
    await tx.user.createMany({
      data: [
        {
          username: "admin@admin.com",
          displayName: "Admin",
          password: await bcrypt.hash("qwerQWER1234!@#$", 10),
          role: "ADMIN",
        },
        {
          username: "user1@user.com",
          displayName: "user1",
          password: await bcrypt.hash("qwerQWER1234!@#$", 10),
        },
        {
          username: "user2@user.com",
          displayName: "user2",
          password: await bcrypt.hash("qwerQWER1234!@#$", 10),
        },
        {
          username: "user3@user.com",
          displayName: "user3",
          password: await bcrypt.hash("qwerQWER1234!@#$", 10),
        },
      ],
    });
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
