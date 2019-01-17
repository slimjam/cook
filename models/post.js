const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const {User} = require('./users');
const {Recipe} = require('./recipe');
//
// const Post = db.define('post', {
//     com_uuid: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV1,
//         primaryKey: true
//     },
//     like_uuid: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV1,
//         primaryKey: true
//     }});

//Post.hasOne(Recipe, {as: 'recipe_id'});  //collision

const Comment = db.define('comment', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Like = db.define('like',{

});

Like.belongsTo(User, {as: 'user_id'});
Recipe.hasMany(Like, {foreignKey: 'fk_post_like_id', sourceKey: 'like_uuid'});
Like.belongsTo(Recipe, {foreignKey: 'fk_post_like_id', targetKey: 'like_uuid'});
Comment.belongsTo(User, {as: 'user_id'});
Recipe.hasMany(Comment, {foreignKey: 'fk_post_comment_id', sourceKey: 'com_uuid'});
Comment.belongsTo(Recipe, {foreignKey: 'fk_post_comment_id', targetKey: 'com_uuid'});

module.exports = {Recipe, Comment, Like};