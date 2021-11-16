import * as status from "../../constants/httpStatusCodes";
import * as successMessages from "../../constants/successMessages";
import * as errorMessages from "../../constants/errorMessages";

import db from "../../database/models";

const { cloudinary } = require("../../helpers/cloudinary");
const { Book, Genre } = db;

export default class BookController {
  /**
   * @description user book function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user book information
   */
  static async create(req, res) {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(`result`, result);

    const { title, author, language, description, price, genreId } = req.body;

    const newBook = await Book.create({
      title,
      author,
      language,
      description,
      price,
      genreId,
      bookImage: result.secure_url,
      cloudinaryImageId: result.public_id,
    });

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: successMessages.BOOK_CREATED,
      book: { ...newBook.get() },
    });
  }

  /**
   * @description method to find one book
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return a book
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    const fetchBook = await Book.findOne({
      where: { id },
      include: [{ model: Genre, as: "genre" }],
    });

    return fetchBook?.get()
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          book: { ...fetchBook.get() },
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { book: errorMessages.BOOK_NOT_FOUND } });
  }

  /**
   * @description method to find all Books
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a user object
   */
  static async getAll(req, res) {
    const fetchBooks = await Book.findAll({
      include: [{ model: Genre, as: "genre" }],
    });

    return fetchBooks.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          books: fetchBooks,
        })
      : res
          .status(status.HTTP_NO_CONTENT)
          .json({ errors: { books: errorMessages.BOOKS_NOT_FOUND } });
  }

  /**
   * @description Book update function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async update(req, res) {
    const id = req.params.id;

    // Fetch Book by id
    const fetchBook = await Book.findOne({
      where: { id },
    });

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(fetchBook.cloudinaryImageId);

    let result;

    if (req?.file?.path) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const { title, author, language, description, price, genreId } = req.body;

    const updateBook = await Book.update(
      {
        title: title || fetchBook.title,
        author: author || fetchBook.author,
        language: language || fetchBook.language,
        description: description || fetchBook.description,
        price: price || fetchBook.price,
        genreId: genreId || fetchBook.genreId,
        bookImage: result?.secure_url || fetchBook.bookImage,
        cloudinaryImageId: result?.public_id || fetchBook.cloudinaryImageId,
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
   * @description delete Book
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async delete(req, res) {
    const id = req.params.id;

    // Fetch Book by id
    const fetchBook = await Book.findOne({
      where: { id },
    });

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(fetchBook.cloudinaryImageId);

    // Delete Book from DB
    await Book.destroy({ where: { id } });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.BOOK_DELETED,
    });
  }
}
