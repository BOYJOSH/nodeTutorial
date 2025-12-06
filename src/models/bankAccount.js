import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class bankAccount extends Model { }

bankAccount.init(
    {
        accountID: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        accountType: {
            type: DataTypes.ENUM('savings', 'checking'),
            allowNull: true
        },
        balance: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: false,
            defaultValue: 0.00,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "USD",
        },

    },
    {
        sequelize,
        timestamps: true,
        modelName: 'bankAccount',
        tableName: 'bankAccounts'
    },
)