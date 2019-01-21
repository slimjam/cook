const db = require('../db/dbconnect');
const Sequelize = require('sequelize');
const i18n = require('../i18n')();
//const {Recipe} = require('./recipe');

const themeList = ['vegetable', 'sugar'];
const languageList = ['ru', 'by'];
const rolesList = ['admin', 'user'];

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    // uuid_r: {
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV1,
    //     primaryKey: true
    // },
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

User.languageList = languageList;
User.themeList = themeList;

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

Role.rolesList = rolesList;

const UserRole = db.define('user_role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.ENUM('admin', 'user')
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

User.belongsToMany(Role, { as: 'Roles', through: { model: UserRole, unique: false }, foreignKey: 'user_id',
    onDelete: 'cascade', hooks:true });
Role.belongsToMany(User, { as: 'Users', through: { model: UserRole, unique: false }, foreignKey: 'role_id',
    onDelete: 'cascade', hooks:true});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(password));
}

function validateAge(age) {
    return typeof age == "number";
}

User.createUserWithProfile = function(login, password, salt,
                                      name, surname, age, lang=languageList[0], theme=themeList[0], role=rolesList[1]){   //test done
                                                        // add validation
    db.sync({force:false}).then( () => {
        if(!validateEmail(login)){return {message: i18n.__('Input email is incorrect')}}
        if(!validatePassword(password)){return {
            message: i18n.__(
                'Input password is incorrect. Password should contain at least one digit,' +
                ' one lower case, one upper case, 8 literals')
        }}
        if(!validateAge(age)){return {message: i18n.__('Input age is incorrect')}}
        User.findOne({ where: {email: login} }).then(async user => {
            if(user){
                console.log(i18n.__('Input email already exists'));
                return {message: i18n.__('Input email already exists')}
            }
            User.create({
                email: login,
                password: password,
                salt: salt,
                name: name,
                surname: surname,
                age: age,
                language: lang,
                theme: theme
            }).then( new_u => {
                Role.findOne({ where: {role: role} }).then(rid => {
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
            Role.findOne({ where: {role: rolesList[0]} }).then(role_o => {
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

User.prototype.setTheme = function(theme){
    if (!(theme in themeList)){ return {message: 'Incorrect value'}}
    db.sync({force:false}).then( () => {
        User.update({
            theme: theme
        })
    }).then( () => { db.sync({force:false})})
};

User.prototype.setLanguage = function(lang){
    if (!(lang in languageList)){ return {message: 'Incorrect value'}}
    db.sync({force:false}).then( () => {
        User.update({
            language: lang
        })
    }).then( () => { db.sync({force:false})})
};

User.prototype.deleteUser = function(){
    var u_id = this.id;
    db.sync({force:false}).then( () => {
        this.destroy()
    }).then(() => {
        UserRole.findOne({where:{user_id: u_id}}).then(ur => {
            ur.destroy()
        })
    }).then( () => { db.sync({force:false})})
};
// delete user

// edit?

//image upload?

module.exports = {User, Role, UserRole};