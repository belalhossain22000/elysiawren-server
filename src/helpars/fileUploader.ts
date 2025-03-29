import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// upload single image
const uploadSingle = upload.single("image")

// upload multiple image
const uploadMultiple = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "images", maxCount: 1 },
  { name: "productImages", maxCount: 1 },
])

export const fileUploader = {
  upload,
  uploadSingle,
  uploadMultiple,
}
