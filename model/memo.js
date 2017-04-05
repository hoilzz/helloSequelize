// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(
//     'testingSequelize', // 데이터베이스 이름
//     'root', // 유저 명
//     'root', // 비밀번호
//     {
//         'host': 'localhost', // 데이터베이스 호스트
//         'dialect': 'mysql' // 사용할 데이터베이스 종류
//     }
// );
//
// var publisher = sequelize.define('Memo', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     body: {
//         type: Sequelize.TEXT,
//         allowNull: true
//     }
// });
//
// module.exports = publisher;

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Memo', {
        pub_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(32), allowNull: false},
    });
};