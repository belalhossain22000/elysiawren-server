import { UserRole } from "@prisma/client"
import prisma from "../../shared/prisma"
import config from "../../config"
import * as bcrypt from "bcrypt"

export const initiateSuperAdmin = async () => {
  const payload: any = {
    firstName: "Super",
    lastName: "Admin",
    surName: "Admin",
    postCode: "1219",
    email: config.adminEmail,
    role: UserRole.SUPER_ADMIN,
  }
  const hashedPassword: string = await bcrypt.hash(
    "12345678",
    Number(config.bcrypt_salt_rounds)
  )

  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })

  if (isExistUser) return

  await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  })

  // console.log(user)
}
