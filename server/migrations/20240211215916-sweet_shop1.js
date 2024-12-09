'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>
  await queryInterface.changeColumn('Products', 'Name', {
    type: Sequelize.STRING, // Измените NEW_TYPE на новый тип
    allowNull: false
  }),

  down: async (queryInterface, Sequelize) =>
  await queryInterface.changeColumn('Products', 'Name', {
    type: Sequelize.INTEGER, // Измените NEW_TYPE на новый тип
    allowNull: false
  }),
};
