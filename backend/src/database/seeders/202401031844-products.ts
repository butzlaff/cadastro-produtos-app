import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('products', [
      {
        name: "Xiaomi Redmi 9",
        brand: "Xiaomi",
        model: "Redmi 9",
        price:  1000,
        color: "red"
      },
      {
        name: "Xiaomi Redmi Note 8",
        brand: "Xiaomi",
        model: "Redmi 8",
        price:  900,
        color: "black"
      }
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('products', {});
  },
}
