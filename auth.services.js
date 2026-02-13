import AccessToken from "../../model/accessToken.js";
import User from "../../model/user.js";
import {
    ConflictException,
    NotFoundException,
    PreconditionFailedException,
    UnauthorizedException,
} from "../common/error-exceptions.js";
import { randomNumberGenerator, randomStringGenerator } from "../common/helper/helper.js";
import RefreshToken from "../../model/refreshToken.js";
import authHelper from "../common/helper/authHelper.js";
import getUserResource from "./resources/userResource.js";


class authServices {
  /**
   * register user
   * @param {*} data
   * @param {*} files
   * @returns
   */
  static async register(data, files) {
    const { fullName, email, password } = data;

    const hashedPassword = await authHelper.bcryptPassword(password);

    const user = await User.create({
      fullName,
      email,
      password : hashedPassword,
    });

    const randomString = randomStringGenerator();

    const token = await authHelper.tokenGenerator({
      id: user.id,
      jti: randomString,
    });

    const accessTokenget = await authHelper.storeAccessToken(user, randomString);
    user.token = token;
    const refreshTokenGet = await authHelper.storeRefreshToken(
      user.token,
      user.id
    );

    return {
      ...new getUserResource(user),
      auth: {
        tokenType: "Bearer",
        accessToken: user.token,
        refreshToken: refreshTokenGet.token,
        expiresIn: accessTokenget.expireAt.getTime()
      },
    };
  }
  

  /**
   * @description Login User
   * @param {*} data
   */
  static async login(data) {

    const { email, password } = data;

    const findUser = await User.findOne({where:{ email: email }});
    if(!findUser){
      throw new NotFoundException("User not found", { success: false });
    }

    const matchedPassword = await authHelper.matchHashedPassword(password, findUser.password);
    if(!matchedPassword){
      throw new PreconditionFailedException("Incorrect password please try again", { success: false });
    }

    const randomString = randomStringGenerator();

    const token = await authHelper.tokenGenerator({
      id: findUser.id,
      jti: randomString,
    });

    const accessTokenget = await authHelper.storeAccessToken(findUser, randomString);
    findUser.token = token;
    const refreshTokenGet = await authHelper.storeRefreshToken(
      findUser.token,
      findUser.id
    );

    return {
      ...new getUserResource(findUser),
      auth: {
        tokenType: "Bearer",
        accessToken: findUser.token,
        refreshToken: refreshTokenGet.token,
        expiresIn: accessTokenget.expireAt.getTime()
      },
    };    


  }

  /**
   * generate NewAccess Token
   * @param {*} data
   * @returns
   */
  static async refresh_token(req) {
    const { token } = req.body;

    // Check if the refresh token exists in the database
    const refreshTokenEntry = await RefreshToken.findOne({where:{
      token: token,
    }});

    if (!refreshTokenEntry) {
      throw new UnauthorizedException({
        message: "Invalid refresh token",
      });
    }

    const randomString = randomStringGenerator();

    const tokens = await authHelper.tokenGenerator({
      id: refreshTokenEntry.userId,
      jti: randomString,
    });

    const accessTokenget = await authHelper.storeAccessToken(
      refreshTokenEntry.userId,
      randomString
    );

    const refreshTokenGet = await authHelper.storeRefreshToken(
      tokens,
      refreshTokenEntry.userId
    );

    refreshTokenEntry.token = tokens;
    await RefreshToken.destroy({where:{ token: token }});

    const findUser = await User.findOne({where:{id: refreshTokenEntry.userId}});

    const findAdmin = await Admin.findOne();
    findUser.adminId = findAdmin.id;

    return {
      ...new getUserResource(findUser),
      auth: {
        tokenType: "Bearer",
        accessToken: tokens,
        refreshToken: refreshTokenGet.token,
        expiresIn: accessTokenget.expireAt.getTime(),
      },
    };
  }

}

export default authServices;