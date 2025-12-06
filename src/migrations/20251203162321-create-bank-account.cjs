'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bankAccounts', {
      accountID: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        unique: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users', // table name
          key: 'id'       // PK of Users
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      bankName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      accountType: {
        type: Sequelize.ENUM('savings', 'checking'),
        allowNull: true
      },
      balance: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bankAccounts");
  },
};

