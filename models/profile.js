const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
//const {User} = require('./users');
//const {Recipe} = require('./recipe');

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
        type: Sequelize.TEXT
    },
    language: {
        type: Sequelize.ENUM('ru', 'by'),
        defaultValue: 'ru'
    }
});

/*Profile.createProfile = function(name, surname, age, user_id){   //test done
                                                        // add validation
    db.sync({force:false}).then( () => {
        Profile.findOne({ where: {name: name} }).then(async profile => {
            if(profile){console.log(i18n.__('Input email already exists')); return null}
            Profile.create({
                name: name,
                surname: surname,
                age: age,
                user_id: user_id
            })}).then( () => { db.sync({force:false})})
};
*/
Profile.belongsTo(db.models.User, {as: 'user_id'});
Profile.hasMany(db.models.Recipe, {foreignKey: 'fk_profile_id', sourceKey: 'uuid'});
Recipe.belongsTo(Profile, {foreignKey: 'fk_profile_id', targetKey: 'uuid'});
module.exports = Profile;