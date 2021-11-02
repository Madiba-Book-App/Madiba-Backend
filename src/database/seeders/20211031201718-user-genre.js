module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "genres",
      [
        {
          name: "kids",
          range: "6-12",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Teenagers",
          range: "13-17",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Adults",
          range: "18-80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("genres", null, {});
  },
};
