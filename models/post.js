const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
//const {User} = require('./users');
//const {Recipe} = require('./recipe');

const Post = db.define('post', {
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
    /*user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },*/

});

Post.belongsTo(db.models.User, {as: 'user_id'});
Post.belongsTo(db.models.Recipe, {as: 'recipe_id'});

const Comment = db.define('comment', {
    /*user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },*/
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

const Like = db.define('like',{

});

Like.belongsTo(db.models.User, {as: 'user_id'});
Post.hasMany(Like, {foreignKey: 'fk_post_like_id', sourceKey: 'like_uuid'});
Like.belongsTo(Post, {foreignKey: 'fk_post_like_id', targetKey: 'like_uuid'});
Comment.belongsTo(db.models.User, {as: 'user_id'});
Post.hasMany(Comment, {foreignKey: 'fk_post_comment_id', sourceKey: 'com_uuid'});
Comment.belongsTo(Post, {foreignKey: 'fk_post_comment_id', targetKey: 'com_uuid'});

module.exports = {Post, Comment, Like};