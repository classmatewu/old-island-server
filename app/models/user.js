// 使用刚才db.js连接到的数据库信息创建一个数据库模型

const {sequelize} = require("../../core/db"); // 导入db对象模块
const {Sequelize, Model} = require("sequelize"); // 导入Sequelize, Model对象

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
    test: Sequelize.STRING,
    test1: Sequelize.STRING,
}, {sequelize})