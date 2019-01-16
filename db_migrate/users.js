// var Sequelize = require('sequelize');
//
// const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/itra');  //to nconf
//
// sequelize.queryInterface.createTable(
//     'roles',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         role: {
//             type: Sequelize.ENUM,
//             values: ['admin', 'user']
//         }
//     },
//     {
//         engine: 'MYISAM',    // default: 'InnoDB'
//         charset: 'latin1',   // default: null
//         schema: 'public'     // default: public, PostgreSQL only.
//     }
// );
//
// sequelize.queryInterface.createTable(
//     'users',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         createdAt: {
//             type: Sequelize.DATE
//         },
//         updatedAt: {
//             type: Sequelize.DATE
//         },
//         userName: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         salt: {
//             type: Sequelize.STRING
//         },
//         is_active: {
//             type: Sequelize.BOOLEAN,
//             defaultValue: true,
//             allowNull: false
//         },
//         role: {
//             type: Sequelize.ENUM,
//             defaultValue: 'user',
//             references: {
//                 model: 'roles',
//                 key: 'id'
//             },
//             onUpdate: 'cascade',
//             onDelete: 'cascade'
//         }
//     },
//     {
//         engine: 'MYISAM',    // default: 'InnoDB'
//         charset: 'latin1',   // default: null
//         schema: 'public'     // default: public, PostgreSQL only.
//     }
// );
//
//
// sequelize.sync({force: false});
//
// module.exports = sequelize;