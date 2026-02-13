import passport from "passport";
import { HttpStatus } from "../error-exceptions.js";
import AccessToken from "../../../model/accessToken.js";
import User from "../../../model/user.js";

export default (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED_EXCEPTION)
        .send({ success: false, status: HttpStatus.UNAUTHORIZED_EXCEPTION, message: "Unauthorized" });
    }

    const exist = await AccessToken.findOne({
      where: {
        token: user.jti,
        isRevoked: false,
        userId: user.id
      }
    });

    if (!exist) {
      return res
        .status(HttpStatus.UNAUTHORIZED_EXCEPTION)
        .send({ success: false, status: HttpStatus.UNAUTHORIZED_EXCEPTION, message: "Unauthorized" });
    }
    const existuser = await User.findOne({
      where: {
        id: exist.userId,
        isVerify: true,
        isDeleted: false,
        isBlocked: false
      }
    });
    if (!existuser) {
      return res
        .status(HttpStatus.UNAUTHORIZED_EXCEPTION)
        .send({ success: false, status: HttpStatus.UNAUTHORIZED_EXCEPTION, message: "Unauthorized" });
    }

    req.user = user;

    return next();
  })(req, res, next);
};