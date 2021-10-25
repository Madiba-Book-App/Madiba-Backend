const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password);

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      "users",
      [
        {
          names: "admin",
          email: "admin@admin.admin",
          password: hashPassword("admin"),
          phone: "00000000",
          address: "kigali",
          roleId: 1,
          subscriptionId: null,
          genreId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete("users", null, {});
  },
};
