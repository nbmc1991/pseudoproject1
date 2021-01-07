const User = require('./User');
const Category = require('./Category');
const Expense = require('./Expense');

User.hasMany(Category, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
User.hasMany(Expense, {
    foreignKey: 'user_id',

});

Category.belongsTo(User, {
    foreignKey: 'user_id'

});
Category.hasMany(Expense, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

Expense.belongsTo(User, {
    foreignKey: 'user_id',

});
Expense.belongsTo(Category, {
    foreignKey: {
        name: "category_id",
    },
});

module.exports = { User, Category, Expense };






