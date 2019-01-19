const db = require('../db/dbconnect');
const Sequelize = require('sequelize');

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
    },
    rate_uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    }
});

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
    { as: 'Ingredient', through: { model: RecipeIngredient, unique: false }, foreignKey: 'r_id',
        onDelete: 'cascade', hooks:true});
Ingredient.belongsToMany(Recipe,
    { as: 'Recipe', through: { model: RecipeIngredient, unique: false }, foreignKey: 'i_id',
        onDelete: 'cascade', hooks:true});

Recipe.search = function(for_search){
    var regexp = '([^\\w\\d]' + for_search +'[^\\w\\d])';
    var result = {};
    db.sync({force:false}).then( () => {
        Recipe.findAll({where: {title: {
            [Op.regexp]: regexp
                }}}).then( t => {
                    result.push(t);
            Recipe.findAll({where: {description: {
                        [Op.regexp]: regexp
                    }}}).then( d => {
                        result.push(d);
                        // add search for comments
            })
        })
        }).then(() => {return result});
};

// Recipe.createIt = function(user_id, title, description, category){
//     db.sync({force:false}).then( () => {
//         Recipe.create({
//             title: title,
//             description: description,
//             user_id: user_id,
//             category_id: category
//         })
//     }).then(() => {return result});
// };

Recipe.belongsTo(Category, {as: 'category_id', onDelete: 'cascade', hooks:true});
module.exports = {Recipe, Ingredient, Category, RecipeIngredient};