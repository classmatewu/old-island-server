// 用Sequelize包连接数据库

const Sequelize = require("sequelize"); // 导入sequelize包
// 导入数据库相关的配置文件config.js的database对象
const {
    dbName,
    host,
    port,
    user,
    password
} = require("../config/config").database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql", // 表明我们是用mysql数据库，需要mysql驱动，这里我们下载了mysql2包
    host,
    port,
    logging: true,
    timezone: "+08:00",
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updared_at",
        deletedAt: "deleted_at",
        underscored: true
    }
});

sequelize.sync({
    force: true
});

module.exports = {
    sequelize,
    tableName: "user"
}