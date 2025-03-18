// Image.service: Module file for the Image.service functionality.
import { PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { uploadFile } from "../../../helpars/uploadFile";
import {
  deleteFromDigitalOceanAWS,
  uploadToDigitalOceanAWS,
} from "../../../helpars/uploadToDigitalOceanAWS";

const createImage = async (req: Request) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No image provided");
  }

  const file = req.file;

  let imageUrl = (await uploadFile(file!, "file")).Location;

  //   const image = await prisma.image.create({
  //     data: {
  //       url: url,
  //       altText: req.body.altText,
  //     },
  //   });

  return { imageUrl };
};

// Service for creating images
const createImages = async (req: Request) => {
  const files = req.files as any[];
  if (!files || files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No images provided");
  }

  const imageUrls = [];

  for (let file of files) {
    let url = (await uploadFile(file, "files")).Location;

    // const image = await prisma.image.create({
    //   data: {
    //     url,
    //     altText: file.originalname,
    //   },
    // });

    imageUrls.push(url);
  }

  return { imageUrls };
};

const getImageById = async (id: string) => {
  const image = await prisma.image.findUnique({
    where: { id },
  });
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, "Image not found");
  }
  return image;
};

const updateImage = async (id: string, req: Request) => {
  const file = req.file;
  let url;
  if (file) {
    url = (await uploadToDigitalOceanAWS(file!)).Location;
  }

  const image = await prisma.image.update({
    where: { id },
    data: {
      url,
      altText: req.body.altText,
    },
  });
  return image;
};

const deleteImage = async (payload: { url: string }) => {
  if (!payload.url) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No image provided");
  }
  const result = deleteFromDigitalOceanAWS(payload.url);
  return result;
};

export const ImageService = {
  createImage,
  getImageById,
  updateImage,
  deleteImage,
  createImages,
};
