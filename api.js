import express from "express";
import AuthRoute from "../src/auth/auth.route.js";

const router = express.Router();

router.use("/auth", AuthRoute);


export default router;
