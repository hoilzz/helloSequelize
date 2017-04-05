
var fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'testingSequelize', // 데이터베이스 이름
    'root', // 유저 명
    'root', // 비밀번호
    {
        'host': 'localhost', // 데이터베이스 호스트
        'dialect': 'mysql' // 사용할 데이터베이스 종류
    }
);
var db = {};

db['Memo'] = sequelize.import(path.join(__dirname, 'memo.js'));
db['Memo'].sync({force: true});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;