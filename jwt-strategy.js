import passport from "passport";
import { JWT } from "../constant/constant.js";
import { ExtractJwt, Strategy as JWTstratagy } from "passport-jwt";
import User from "../../../model/user.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT.SECRET,
};

passport.use(
    new JWTstratagy(options, async (jwtPayload, done) => {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id,
                },
            });

            if (!user) {
                return done(null, false);
            }
            delete user.password;
            return done(null, { ...user, jti: jwtPayload.jti });
        } catch (error) {
            console.log(error);
            return done(error, false);
        }
    })
);
