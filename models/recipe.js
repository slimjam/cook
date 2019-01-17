const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const {User} = require('./users');

const Recipe = db.define('recipe', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    com_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    like_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
});

/////////////////////////////////////////////////////////
// ADD CONSTRAINT
////////////////////////////////////////////////////////
// db.queryInterface.addConstraint('recipes', ['rate'], {
//     type: 'check',
//     where: {
//         rate: {
//             [Sequelize.Op.and]:{
//                 [Sequelize.Op.gte]:0,
//                 [Sequelize.Op.lte]:5
//             }
//         }
//     }
// });

const Ingredient = db.define('ingredient', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const RecipeIngredient = db.define('recipe_ingredient', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

Recipe.belongsToMany(Ingredient,
    { as: 'Ingredient', through: { model: RecipeIngredient, unique: false }, foreignKey: 'r_id' });
Ingredient.belongsToMany(Recipe,
    { as: 'Recipe', through: { model: RecipeIngredient, unique: false }, foreignKey: 'i_id' });

Recipe.belongsTo(Category, {as: 'category_id'});
module.exports = {Recipe, Ingredient, Category, RecipeIngredient};