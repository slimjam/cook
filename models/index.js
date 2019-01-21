const {User, Role, UserRole} = require('./users');
const {Recipe, Ingredient, Category, RecipeIngredient, UserRecipe} = require('./recipe');
const {Rate, Comment, Like} = require('./post');
const db = require('../db/dbconnect');
const CATEGORIES_LIST = require('../db/data/categories');
const INGREDIENTS_LIST = require('../db/data/ingredients');

db.sync().then(() => {
    console.log('start sync!!!!!!!!!!');
    Role.findOrCreate({
        where: {
            role: Role.rolesList[0]
        }
    }).then(admin_role => {
        Role.findOrCreate({
            where: {
                role: Role.rolesList[1]
            }
        })/*.then(user_role => {
            User.createUserWithProfile('admin', 'admin', null, 'admin', 'admin', 99,
                'ru', 'sugar', admin_role.role);
            User.createUserWithProfile('user', 'user', null, 'user', 'user', 99,
                'ru', 'sugar', user_role.role);
        })*/
    }).then(() => {
        CATEGORIES_LIST.forEach(async category => {
            if(category){
                await Category.findOrCreate({
                    where: {
                        name: category
                    }
                })
            }
        })
    }).then(() => {
        INGREDIENTS_LIST.forEach(async ingridient => {
            if (ingridient){
                await Ingredient.findOrCreate({
                    where: {
                        name: ingridient
                    }
                })
            }
        })
    }).then(() => {
        db.sync().then(() => {
            console.log('sync done!');
        });
    })
});

module.exports = db;
