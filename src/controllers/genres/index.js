import db from "../../database/models/";
import * as status from "../../constants/httpStatusCodes";
import * as errorMessages from "../../constants/errorMessages";

const { Genre } = db;

export default class genreController {
  /**
   * @description method to find all Genres
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a genre object
   */
  static async getAll(req, res) {
    const fetchGenre = await Genre.findAll();

    return fetchGenre.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          genre: fetchGenre,
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { genres: errorMessages.GENRE_NOT_FOUND } });
  }
}
