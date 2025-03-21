// Image.routes: Module file for the Image.routes functionality.
import express from "express"
import { ImageController } from "./Image.controller"
import { fileUploader } from "../../../helpars/fileUploader"

const router = express.Router()

// Create image route (POST)
router.post("/single", fileUploader.uploadSingle, ImageController.createImage)

// Create image route (POST)
router.post(
  "/multiple",
  fileUploader.upload.array("files"),
  ImageController.createImages
)

// Get image by ID route (GET)
// router.get("/:id", ImageController.getImageById);

// // Update image by ID route (PUT)
// router.put("/:id", upload.single("file"), ImageController.updateImage);

// Delete image by ID route (DELETE)
router.delete("/delete", ImageController.deleteImage)

export const ImageRoutes = router
