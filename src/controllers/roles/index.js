import * as helper from '../../helpers';
import db from '../../database/models';
import status from '../../helpers/status';
import { comparePassword } from '../../utils/password';

export default class RoleController {
  /**
   * @description assign role function
   * @param {object} req assign role request
   * @param {object} res response from server
   */
  static async assignRole(req, res) {
    const { roleId } = req.body;
    const { userId} = req.params;

    const userRole = await db.UserRole.create({roleId, userId});    

    return !userRole
      ? res.status(errors.code).json({ errors: 'Unable to assign role' })
      : res.status(status.CREATED).json({ data: userRole, message: 'User assigned the role successfully' });
  }


   /**
   * @description - Revoke role function
   * @param {object} req role request
   * @param {object} res  response form server
   */
  static async revokeRole(req, res) {
     const { roleId } = req.body;
    const { userId } = req.params;


    const RoleRevoked = await db.UserRole.destroy({ where: {
        roleId, userId
    }});    

    return !RoleRevoked
      ? res.status(errors.code).json({ errors: 'Unable to revoke role' })
      : res.status(status.CREATED).json({ data: RoleRevoked, message: 'Role revoked successfully' });
  }

  static async getUserRoles(req, res) {
    const { userId } = req.params;

    const userRoles = await db.UserRole.findAll({ where: {
         userId
    }});    

    return !userRoles
      ? res.status(errors.code).json({ errors: 'Unable to revoke role' })
      : res.status(status.CREATED).json({ data: userRoles, message: 'User roles' });
  }

  static async getRoles(req, res) {
    const roles = await db.Role.findAll();    

    return !roles
      ? res.status(errors.code).json({ errors: 'Unable to revoke role' })
      : res.status(status.CREATED).json({ data: roles});
  }

}