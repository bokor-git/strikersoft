import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import * as bcrypt from 'bcryptjs';
import ROLES from "../../src/global/constants";

async function seed() {

  const password = bcrypt.hashSync(process.env.ADMIN_PASS, 8);
  const admin = await prisma.user.findFirst({where: {role: ROLES.ADMIN}})
  if (admin) {
    console.log("Admin already exist")
    return
  }
  await prisma.user.create({
    data: {
      login: process.env.ADMIN_LOGIN,
      password,
      role: ROLES.ADMIN
    }
  })
  console.log("Admin was created")
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })