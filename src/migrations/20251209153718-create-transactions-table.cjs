'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      transaction_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      transactionType:{
        type: Sequelize.ENUM("transfer", "withdrawal", "deposit"),
        allowNull:false
      },
      senderAccount: {
        type: Sequelize.STRING,
        references: {
          model: "bankAccounts",      
          key: "accountID"        
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      recieverAccount: {
        type: Sequelize.STRING,
        references: {
          model: "bankAccounts",
          key: "accountID"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("successful", "pending", "failed"),
        allowNull:false,
        defaultValue: "pending"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};