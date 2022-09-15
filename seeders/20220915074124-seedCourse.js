'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = JSON.parse(fs.readFileSync(`./data/courses.json`, `utf-8`))
     const courses = data.map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date()
      }
     })
     return queryInterface.bulkInsert('Courses', courses, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Courses', null, {})
  }
};
