const {User, Role, UserRole} = require('./users');
const {Recipe, Ingredient, Category, RecipeIngredient} = require('./recipe');
const {Rate, Comment, Like} = require('./post');
const db = require('../db/dbconnect');
User.findOrCreate({where: {
        email: 'admin',
        password: 'admin',
        salt: null,
        name: 'admin',
        surname: 'admin',
        age: 99
    }});
db.sync().then(() => {
    console.log('sync done!');
});

module.exports = db;
