import "../../../model/accessToken.js";
import RefreshToken from "../../../model/refreshToken.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcryptjs";
import { BCRYPT, JWT } from "../constant/constant.js";
import AccessToken from "../../../model/accessToken.js";
import { randomStringGenerator } from "./helper.js";

class authHelper {
  /**
   * @description : Bcrypt password
   * @param {*} password
   */

  static async bcryptPassword(password) {
    const hashePassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, BCRYPT.SALT_ROUND, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return hashePassword;
  }

  /**
   * JWT Token Generator
   * @param {*} data
   * @returns
   */
  static async tokenGenerator(data) {
    return await jwt.sign(data, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN });
  }

  /**
   * Store access token to database
   * @param {*} user
   * @param {*} cryptoString
   * @returns
   */
  static async storeAccessToken(user, cryptoString) {
    const expireAt = moment(new Date())
      .utc()
      .add(1, "years")
      .format("YYYY-MM-DD hh:mm:ss");

    const data = await AccessToken.create({
      token: cryptoString,
      userId: user.id,
      expireAt: expireAt,
    });
    return data;
  }

  static async storeRefreshToken(accessToken, userId) {
    const refreshToken = randomStringGenerator();
    const decodedToken = jwt.decode(accessToken);

    const expireAt = moment(new Date())
      .utc()
      .add(2, "years")
      .format("YYYY-MM-DD hh:mm:ss");

    const data = await RefreshToken.create({
      token: refreshToken,
      accessToken: decodedToken.jti,
      userId: userId,
      expireAt: expireAt,
    });
    return data;
  }

  /**
   * @description matched password
   * @param {*} password
   * @param {*} userPassword
   * @returns
   */
  static async matchHashedPassword(password, userPassword) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userPassword, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });

    return hashedPassword;
  }
}

export default authHelper;
