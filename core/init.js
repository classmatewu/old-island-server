const Router = require("koa-router");
const requireDirectory = require("require-directory");

// 定义一个js类
class InitManager{
    // 定义一个静态方法，为入口方法
    static initCore(app) { // 将app.js中的app实例传进来
        InitManager.app = app; // 将参数app绑定到InitManager类上，即为静态变量
        InitManager.initLoadRouters(); //调用类中的initLoadRouters()静态方法，即处理一次性导入注册路由的功能部分
        InitManager.loadConfig(); // 调用loadConfig
    }

    // 生产环境prod还是开发环境dev,放到全局global
    static loadConfig(path = "") {
        const configPath = path || process.cwd() + "/config/config.js"
        const config = require(configPath);
        global.config = config;
    }

    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`; // es6写法，得到要导入路由文件所在的绝对路径
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        });

        function whenLoadModule(aModuleObj) {
            if(aModuleObj instanceof Router) {
                InitManager.app.use(aModuleObj.routes());
            }
        }
    }

}

module.exports = InitManager;