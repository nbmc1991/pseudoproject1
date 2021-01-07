const { Model, DataTypes } = require('sequelize');
//bring in database connection from config
const sequelize = require('../config/connection');

//comment class might be needed,
//figure out how to link comment to user uuid>>???
class Expense extends Model { }


Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        expense_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },

    }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'expense',
});

module.exports = Expense;