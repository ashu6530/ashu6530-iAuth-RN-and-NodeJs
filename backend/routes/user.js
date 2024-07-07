import express from "express";
import { Signin, Signup, signOut, uploadProfile } from "../controller/user.js";
import {
  handleSignupValidation,
  validateUserSignin,
  validateUserSignup,
} from "../middleware/validation/user.js";
import { isAuth } from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
import { User } from "../model/user.js";
const router = express.Router();

router.post("/signup", validateUserSignup(), handleSignupValidation, Signup);
router.post("/signin", validateUserSignin(), handleSignupValidation, Signin);
router.post("/signout", isAuth,signOut )


const storage = multer.diskStorage({});
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
router.post(
  "/upload_profile",
  isAuth,
  upload.single("avatar"),
  uploadProfile
);

export default router;