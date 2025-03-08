import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { validateDataSchema } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

// register user
router.post(
  "/register",
  fileUploader.uploadMultiple,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = validateDataSchema.parse(JSON.parse(req.body.data));

    return userController.createUser(req, res, next);
  }
);

// get all  user
router.get("/", userController.getUsers);

// get all  user
router.get("/business", userController.getAllBusiness);

// profile user
router.put(
  "/profile",
  // validateRequest(userValidationSchema.userUpdateSchema),
  auth(),
  userController.updateProfile
);

// update  user
router.put("/:id", userController.updateUser);

export const userRoutes = router;
