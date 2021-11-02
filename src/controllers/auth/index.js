import * as helper from "../../helpers";
import db from "../../database/models";

import status from "../../helpers/status";
import { comparePassword } from "../../utils/password";

export default class AuthController {
  /**
   * @description user signup function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user information & token
   */
  static async signup(req, res) {
    req.body.password = helper.password.hash(req.body.password);
    const newUser = await db.User.create(req.body);
    const errors = newUser.errors
      ? helper.checkCreateUpdateUserErrors(newUser.errors)
      : null;

    const payload = {
      id: newUser.id,
      role: newUser.role,
      permissions: newUser.permissions,
    };

    const token = helper.token.generate(payload);
    delete newUser.dataValues.password;

    return errors
      ? res.status(errors.code).json({ errors: errors.errors })
      : res.status(status.CREATED).json({
          data: newUser,
          token,
          message: "User registered successfully",
        });
  }

  /**
   * @description - login user function
   * @param {object} req user request
   * @param {object} res  response form server
   * @returns {object} user token
   */
  static async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await db.User.findOne({ email });
    if (Object.keys(checkUser).length > 0) {
      const comparedPassword = comparePassword(
        password,
        checkUser.password || ""
      );

      console.log(`checkUser.password `, password, checkUser.password);
      if (!comparedPassword) {
        return res.status(status.UNAUTHORIZED).json({
          errors: { credentials: "The credentials you provided are incorrect" },
        });
      }
      const payload = {
        id: checkUser.id,
        role: checkUser.role,
        permissions: checkUser.permissions,
      };
      const token = helper.token.generate(payload);
      delete checkUser.password;
      return res.status(status.OK).json({
        message: "signIn successfully",
        user: checkUser,
        token,
      });
    }
  }
}
