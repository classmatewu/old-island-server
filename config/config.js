// 配置文件

module.exports = {
    // prod生产文件
    environment:'dev', // 表示当前为开发环境,项目上线后就需要将dev改为prod

    // 配置数据库信息
    database: {
        dbName: "island",
        host: "localhost",
        port: 3306,
        user: "root",
        password: "123456",
    }

}