import * as status from "../../constants/httpStatusCodes";
import * as errorMessages from "../../constants/errorMessages";
import * as successMessages from "../../constants/successMessages";

import db from "../../database/models";

const { Borrow, Book, User } = db;

export default class BorrowController {
  /**
   * @description borrow book function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} borrow information
   */
  static async create(req, res) {
    const { bookId, returnAt } = req.body;

    const fetchBook = await Book.findOne({
      where: { id: bookId },
    });

    const checkIfBorrowed = await Borrow.findOne({
      where: { bookId },
    });

    if (fetchBook == null) {
      return res.status(status.HTTP_NOT_FOUND).json({
        status: status.HTTP_NOT_FOUND,
        message: ` Book with id ${bookId} does not exist`,
      });
    }

    if (checkIfBorrowed) {
      return res.status(status.HTTP_EXIST).json({
        status: status.HTTP_EXIST,
        message: ` You have already borrowed this book`,
      });
    }

    const borrow = await Borrow.create({
      userId: req.user.id,
      bookId,
      returnAt,
    });

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: successMessages.BOOK_BORROWED_SUCCESFULLY,
      borrow: { ...borrow.get() },
    });
  }

  /**
   * @description method to find all Borrows
   * @param {object} req genre request object
   * @param {object} res response object from server
   * @returns {object} return a borrow object
   */
  static async getAll(req, res) {
    const userId = req.user.id;
    const fetchBorrows = await Borrow.findAll({
      where: { userId },
      include: [
        { model: User, as: "user" },
        { model: Book, as: "book" },
      ],
    });

    return fetchBorrows.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          borrows: fetchBorrows,
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { borrows: errorMessages.BORROWS_NOT_FOUND } });
  }
}
