import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"
import * as bcrypt from "bcrypt"
import { IPaginationOptions } from "../../../interfaces/paginations"
import { paginationHelper } from "../../../helpars/paginationHelper"
import { Prisma, User, UserRole, UserStatus } from "@prisma/client"
import config from "../../../config"
import httpStatus from "http-status"
import { userSearchAbleFields } from "./user.costant"

// Create a new user in the database.
const createUserIntoDb = async (payload: User) => {
  const { email, password, firstName, lastName, surName, postCode } = payload

  if (!email || !password || !firstName || !lastName || !surName || !postCode) {
    throw new ApiError(400, "All fields are required")
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  })

  if (existingUser) {
    if (existingUser.email === payload.email) {
      throw new ApiError(
        400,
        `User with this email ${payload.email} already exists`
      )
    }
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  )

  let user

  prisma.$transaction(async (tsx) => {
    user = await tsx.user.create({
      data: { ...payload, password: hashedPassword },
    })

    await tsx.cart.create({
      data: {
        userId: user.id,
      },
    })
  })

  return user
}

// reterive all users from the database also searcing anf filetering
const getUsersFromDb = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options)
  const { searchTerm, ...filterData } = params

  const andCondions: Prisma.UserWhereInput[] = []

  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }
  const whereConditons: Prisma.UserWhereInput = { AND: andCondions }

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  })
  const total = await prisma.user.count({
    where: whereConditons,
  })

  if (!result || result.length === 0) {
    throw new ApiError(404, "No active users found")
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// update profile by user won profile uisng token or email and id
const updateProfile = async (user: User, payload: Partial<User>) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user.email,
      id: user.id,
    },
  })

  if (!userInfo) {
    throw new ApiError(404, "User not found")
  }

  // Update the user profile with the new information
  const result = await prisma.user.update({
    where: {
      email: userInfo.email,
    },
    data: payload,
  })

  if (!result)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update user profile"
    )

  return result
}

// update user data into database by id fir admin
const updateUserIntoDb = async (payload: User, id: string) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  })
  if (!userInfo)
    throw new ApiError(httpStatus.NOT_FOUND, "User not found with id: " + id)

  const result = await prisma.user.update({
    where: {
      id: userInfo.id,
    },
    data: payload,
  })

  if (!result)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update user profile"
    )

  return result
}

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
  updateProfile,
  updateUserIntoDb,
}
