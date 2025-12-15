import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/sequelize.js";

export class Transaction extends Model {
  static associate(models) {
    // senderAccount → BankAccounts.accountNumber
    Transaction.belongsTo(models.bankAccount, {
      foreignKey: "senderAccount",
      targetKey: "id",
      as: "senderBankAccount"
    });

    // recieverAccount → BankAccounts.accountNumber
    Transaction.belongsTo(models.BankAccount, {
      foreignKey: "recieverAccount",
      targetKey: "id",
      as: "receiverBankAccount"
    });

    // // senderId → Users.id
    // Transaction.belongsTo(models.User, {
    //   foreignKey: "senderId",
    //   as: "senderUser"
    // });

    // // recieverId → Users.id
    // Transaction.belongsTo(models.User, {
    //   foreignKey: "recieverId",
    //   as: "receiverUser"
    // });
  }
}

Transaction.init(
  {
    transaction_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    transactionType: {
      type: DataTypes.ENUM("transfer", "withdrawal", "deposit"),
      allowNull: false
    },
    senderId: {
      type: DataTypes.UUID,
      references: {
          model: "accounts",      
          key: "id"        
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    recieverId: {
      type: DataTypes.UUID,
      references: {
          model: "accounts",      
          key: "id"        
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("successful", "pending", "failed"),
      allowNull: false,
      defaultValue: "pending"
    }
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "Transactions"
  }
);

export default Transaction;