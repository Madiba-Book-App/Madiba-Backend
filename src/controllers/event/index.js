import * as status from "../../constants/httpStatusCodes";
import * as successMessages from "../../constants/successMessages";
import * as errorMessages from "../../constants/errorMessages";

import db from "../../database/models";

const { cloudinary } = require("../../helpers/cloudinary");
const { Event } = db;

export default class EventController {
  /**
   * @description event function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user book information
   */
  static async create(req, res) {
    const result = await cloudinary.uploader.upload(req.file.path);

    const { title, description, location, time, date, price, places } =
      req.body;

    const newEvent = await Event.create({
      title,
      location,
      time,
      description,
      date,
      price,
      places,
      eventImage: result.secure_url,
      cloudinaryImageId: result.public_id,
    });

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: successMessages.EVENT_CREATED,
      event: { ...newEvent.get() },
    });
  }

  /**
   * @description method to find one Event
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return an Event
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    const fetchEvent = await Event.findOne({
      where: { id },
    });

    return fetchEvent?.get()
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          event: { ...fetchEvent.get() },
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { event: errorMessages.EVENT_NOT_FOUND } });
  }

  /**
   * @description method to find all Events
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a user object
   */
  static async getAll(req, res) {
    const fetchEvents = await Event.findAll();

    return fetchEvents.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          events: fetchEvents,
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { events: errorMessages.EVENTS_NOT_FOUND } });
  }

  /**
   * @description delete Book
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async delete(req, res) {
    const id = req.params.id;

    // Fetch Book by id
    const fetchEvent = await Event.findOne({
      where: { id },
    });

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(fetchEvent.cloudinaryImageId);

    // Delete Event from DB
    await Event.destroy({ where: { id } });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.EVENT_DELETED,
    });
  }
}
