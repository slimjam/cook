const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const i18n = require('../i18n');
const {Recipe} = require('./recipe');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    uuid_r: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
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
    },
    image: {
        type: Sequelize.STRING
    },
});

const Role = db.define(
    'roles',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.ENUM('admin', 'user')
        }
    }
);

const UserRole = db.define('user_role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.ENUM('admin', 'user')
    }
});

User.belongsToMany(Role, { as: 'Roles', through: { model: UserRole, unique: false }, foreignKey: 'user_id' });
Role.belongsToMany(User, { as: 'Users', through: { model: UserRole, unique: false }, foreignKey: 'role_id' });


User.hasMany(Recipe, {foreignKey: 'fk_profile_id', sourceKey: 'uuid_r'});
Recipe.belongsTo(User, {foreignKey: 'fk_profile_id', targetKey: 'uuid_r'});
User.createUserWithProfile = function(login, password, salt, name, surname, age){   //test done
                                                        // add validation
    db.sync({force:false}).then( () => {
        User.findOne({ where: {userName: userName} }).then(async user => {
            if(user){console.log(i18n.__('Input email already exists')); return null}
            User.create({
                userName: userName,
                password: password,
                salt: salt,
                name: name,
                surname: surname,
                age: age
            }).then( new_u => {
                Role.findOne({ where: {role: 'user'} }).then(rid => {
                    UserRole.create({
                        user_id: new_u.id,
                        role_id: rid.id,
                        name: rid.role
                    })
                })
            })
        });


    }).then( () => { db.sync({force:false})})
};

User.prototype.setAdmin = function(){
    db.sync({force:false}).then( () => {
            Role.findOne({ where: {role: 'admin'} }).then(role_o => {
                UserRole.findOne({ where: {user_id: this.id} }).then(user_role => {
                    user_role.update({
                        role_id: role_o.id,
                        name: role_o.role})
                })
            })
        }).then( () => { db.sync({force:false})})
};

User.prototype.blockUser = function(){
    db.sync({force:false}).then( () => {
        User.update({
            is_active: false
        })
    }).then( () => { db.sync({force:false})})
};

User.prototype.unblockUser = function(){
    db.sync({force:false}).then( () => {
        User.update({
            is_active: true
        })
    }).then( () => { db.sync({force:false})})
};

User.prototype.changePassword = function(new_password){
    db.sync({force:false}).then( () => {
        User.update({
            password: new_password
        })
    }).then( () => { db.sync({force:false})})
};

User.prototype.checkPassword = function(password){
    return password === this.password;
};

// delete user

module.exports = {User, Role, UserRole};