//Auth
import authServices from "./auth.services.js";
import { SuccessResponceHandle } from "../common/helper/helper.js";


class authController {

  /**
   * register user
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async register(req, res) {
    const data = await authServices.register(req.body, req.files);
    return res.send(SuccessResponceHandle(201, "Registration successful!", data));
  } 


  /**
   * login user
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async login(req, res) {
    const data = await authServices.login(req.body);
    return res.send(SuccessResponceHandle(201, "Login successful!", data));
  }

  /**
   * generate new access token
   * @param {*} req
   * @param {*} res
   * @returns
   */

  static async refresh_token(req, res) {
    const data = await authServices.refresh_token(req);
    return res.send(SuccessResponceHandle(201, "Success", data));
  }
}

export default authController;

