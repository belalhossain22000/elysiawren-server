import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import { IUser, IUserFilterRequest } from "./user.interface";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../../interfaces/paginations";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import { businessSearchAbleFields, userSearchAbleFields } from "./user.costant";
import config from "../../../config";
import httpStatus from "http-status";
import { Request } from "express";
import { uploadToDigitalOceanAWS } from "../../../helpars/uploadToDigitalOceanAWS";
import { uploadFile } from "../../../helpars/uploadFile";

// Create a new user and business in the database using Prisma transaction
const createUserIntoDb = async (req: Request) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const userData = req.body.user;
  const businessData = req.body.business;

  // Using prisma.$transaction with transactionClient for atomic operations
  const result = await prisma.$transaction(
    async (transactionClient) => {
      // Check if user already exists
      const isUserExist = await transactionClient.user.findUnique({
        where: { email: userData.email },
      });

      if (isUserExist) {
        throw new ApiError(400, "User already exists with this email address");
      }

      // Handle file uploads for user profile image
      let profileImage = await uploadFile(files?.profileImage?.[0], "Profile");
      userData.profileImage = profileImage.Location;

      // Hash password securely
      const hashedPassword: string = await bcrypt.hash(
        userData.password,
        Number(config.bcrypt_salt_rounds) || 12
      );

      // Create the user within the transaction
      const user = await transactionClient.user.create({
        data: { ...userData, password: hashedPassword },
      });

      // Set business owner ID to the user ID
      businessData.ownerId = user.id;

      // Handle file uploads for business images
      let companyLogo = await uploadFile(
        files.companyLogo?.[0],
        "Company Logo"
      );
      businessData.companyLogo = companyLogo.Location;

      let businessLicense = await uploadFile(
        files.businessLicense?.[0],
        "Business License"
      );
      businessData.businessLicense = businessLicense.Location;

      let transportPermitImage = await uploadFile(
        files.transportPermitImage?.[0],
        "Transport Permit"
      );
      businessData.transportPermitImage = transportPermitImage.Location;

      // Create business within the transaction
      const business = await transactionClient.business.create({
        data: { ...businessData },
      });

      // Return the created user and business data
      return { user, business };
    },
    {
      timeout: 10000,
    }
  );

  return result;
};

//! reterive all users from the database also searcing anf filetering
const getUsersFromDb = async (
  params: IUserFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditons: Prisma.UserWhereInput = { AND: andCondions };

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
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      profileImage: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.user.count({
    where: whereConditons,
  });

  if (!result || result.length === 0) {
    throw new ApiError(404, "No active users found");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllBusiness = async (
  params: IUserFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.BusinessWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: businessSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditons: Prisma.BusinessWhereInput = { AND: andCondions };

  const result = await prisma.business.findMany({
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
  });
  const total = await prisma.business.count({
    where: whereConditons,
  });

  if (!result || result.length === 0) {
    throw new ApiError(404, "No active freight found");
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update profile by user won profile uisng token or email and id
const updateProfile = async (user: IUser, payload: User) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user.email,
      id: user.id,
    },
  });

  if (!userInfo) {
    throw new ApiError(404, "User not found");
  }

  // Update the user profile with the new information
  const result = await prisma.user.update({
    where: {
      email: userInfo.email,
    },
    data: {
      name: payload.name || userInfo.name,
      username: payload.username || userInfo.username,
      email: payload.email || userInfo.email,
      profileImage: payload.profileImage || userInfo.profileImage,
      phoneNumber: payload.phoneNumber || userInfo.phoneNumber,
    },
    select: {
      id: true,
      name: true,
      username: true,

      email: true,
      profileImage: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update user profile"
    );

  return result;
};

// update user data into database by id fir admin
const updateUserIntoDb = async (payload: IUser, id: string) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  if (!userInfo)
    throw new ApiError(httpStatus.NOT_FOUND, "User not found with id: " + id);

  const result = await prisma.user.update({
    where: {
      id: userInfo.id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      profileImage: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update user profile"
    );

  return result;
};

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
  getAllBusiness,
  updateProfile,
  updateUserIntoDb,
};
