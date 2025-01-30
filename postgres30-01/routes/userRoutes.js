import express from "express";
import {
  registerUser,
  currentUser,
  loginUser,
} from "../controllers/userController.js";
import { validateToken } from "../utils/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateToken, currentUser);

// module.exports = router;
export default router;
