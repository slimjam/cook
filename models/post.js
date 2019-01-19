const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const {User} = require('./users');
const {Recipe} = require('./recipe');

const Comment = db.define('comment', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Like = db.define('like',{

});

const Rate = db.define('rate',{
    stars: {
        type: Sequelize.INTEGER
    }
});

Rate.belongsTo(User, {as: 'user_id', onDelete: 'cascade', hooks:true});
Rate.belongsTo(Recipe, {foreignKey: 'fk_rate_recipe_id', targetKey: 'rate_uuid', onDelete: 'cascade', hooks:true});
Recipe.hasMany(Rate, {foreignKey: 'fk_rate_recipe_id', sourceKey: 'rate_uuid', onDelete: 'cascade', hooks:true});
Like.belongsTo(User, {as: 'user_id', onDelete: 'cascade', hooks:true});
Recipe.hasMany(Like, {foreignKey: 'fk_post_like_id', sourceKey: 'like_uuid', onDelete: 'cascade', hooks:true});
Like.belongsTo(Recipe, {foreignKey: 'fk_post_like_id', targetKey: 'like_uuid', onDelete: 'cascade', hooks:true});
Comment.belongsTo(User, {as: 'user_id', onDelete: 'cascade', hooks:true});
Recipe.hasMany(Comment, {foreignKey: 'fk_post_comment_id', sourceKey: 'com_uuid', onDelete: 'cascade', hooks:true});
Comment.belongsTo(Recipe, {foreignKey: 'fk_post_comment_id', targetKey: 'com_uuid', onDelete: 'cascade', hooks:true});

module.exports = {Comment, Like, Rate};