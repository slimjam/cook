const {User, Role, UserRole} = require('./users');
const {Recipe, Ingredient, Category, RecipeIngredient} = require('./recipe');
const {Post, Comment, Like} = require('./post');
const db = require('../db/dbconnect');
db.sync().then(() => {
    console.log('sync done!');
});

module.exports = db;
