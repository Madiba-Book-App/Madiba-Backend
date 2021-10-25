module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "normal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete("roles", null, {});
  },
};
