import * as tokens from "../../utils/tokens";
import * as status from "../../constants/httpStatusCodes";
import * as errorMessages from "../../constants/errorMessages";
import * as successMessages from "../../constants/successMessages";

import db from "../../database/models";

const { Subscription } = db;

export default class SubscriptionController {
  /**
   * @description subscription function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user information & token
   */
  static async create(req, res) {
    const newSubscription = await Subscription.create(req.body);

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: successMessages.SUBSCRIPTION_CREATED,
      subscription: newSubscription,
    });
  }

  /**
   * @description method to find all Books
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a user object
   */
  static async getAll(req, res) {
    const fetchSubscription = await Subscription.findAll();

    return fetchSubscription.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          subscriptions: fetchSubscription,
        })
      : res.status(status.HTTP_NO_CONTENT).json({
          errors: { subscriptions: errorMessages.SUBSCRIPTION_NOT_FOUND },
        });
  }

  /**
   * @description method to find one subscription
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return a book
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    const fetchSubscription = await Subscription.findOne({
      where: { id },
    });

    return fetchSubscription?.get()
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          subscription: { ...fetchSubscription.get() },
        })
      : res.status(status.HTTP_NOT_FOUND).json({
          errors: { subscription: errorMessages.SUBSCRIPTION_NOT_FOUND },
        });
  }

  /**
   * @description Subscription update function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async update(req, res) {
    const id = req.params.id;

    // Fetch Book by id
    const fetchSubscription = await Subscription.findOne({
      where: { id },
    });

    const { name, price, description } = req.body;

    const updateBook = await Subscription.update(
      {
        name: name || fetchSubscription.name,
        description: description || fetchSubscription.description,
        price: price || fetchSubscription.price,
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.UPDATED,
      user: { ...updateBook[1].dataValues },
    });
  }

  /**
   * @description delete Subscription
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async delete(req, res) {
    const id = req.params.id;

    // Delete Subscription from DB
    await Subscription.destroy({ where: { id } });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.SUBSCRIPTION_DELETED,
    });
  }
}
