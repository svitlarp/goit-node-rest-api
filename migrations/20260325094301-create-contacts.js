'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('contacts', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts')
  },
};



// module.exports = {
//   async up(queryInterface, Sequelize) {
//     return queryInterface.sequelize.transaction(async (t) => {
//       // всі операції тут
//     });
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.sequelize.transaction(async (t) => {
//       // rollback
//     });
//   }
// };