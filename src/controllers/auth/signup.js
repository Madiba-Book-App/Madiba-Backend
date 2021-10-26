import * as helper from '../../helpers';
import db from '../../database/models';

import sendMailer from '../../helpers/mailer';
import status from '../../helpers/status';
export default class AuthController {
  /**
   * @description user signup function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user information & token
   */
  static async signup(req, res) {
    const { email, firstName, lastName } = req.body;

    req.body.password = helper.password.hash(req.body.password);
    const newUser = await db.User.create(req.body);
    const errors = newUser.errors ? helper.checkCreateUpdateUserErrors(newUser.errors) : null;
     delete newUser.dataValues.password;

    return errors
      ? res.status(errors.code).json({ errors: errors.errors })
      : res.status(status.CREATED).json({ data: newUser, message: 'User registered successfully' });
  }

}