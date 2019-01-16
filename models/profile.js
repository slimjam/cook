const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const {User} = require('./users');
const {Recipe} = require('./recipe');

const Profile = db.define('profile', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },/*
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },*/
   theme: {
        type: Sequelize.ENUM('vegetable', 'sugar'),
       defaultValue: 'vegetable'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    language: {
        type: Sequelize.ENUM('ru', 'by'),
        defaultValue: 'ru'
    }
});

Profile.belongsTo(User, {as: 'user_id'});
Profile.hasMany(Recipe, {foreignKey: 'fk_profile_id', sourceKey: 'uuid'});
Recipe.belongsTo(Profile, {foreignKey: 'fk_profile_id', targetKey: 'uuid'});
module.exports = Profile;