import express from "express";
import asycHandler from "express-async-handler";
import validator from "../common/config/joi-validator.js";
import AuthController from "./auth.controller.js";
import {
  loginDto,
  refresh_token,
  registerDto,
} from "./dtos/dto.auth.js";
const router = express.Router();


router.post(
  "/register",
  validator.body(registerDto),
  asycHandler(AuthController.register)
);

router.post(
  "/login",
  validator.body(loginDto),
  asycHandler(AuthController.login)
);

router.post(
  "/refresh_token",
  validator.body(refresh_token),
  asycHandler(AuthController.refresh_token)
);

export default router;
