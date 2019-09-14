// 处理异常三、全局处理异常  在所有函数的最外层包裹一个处理异常的中间件函数
// AOP  面向切面编程

// 中间件本质就是一个函数，记得中间件的写法就是与await、async绑定的，这点记住
// const catchError = async(ctx, next) => {
//     try {
//         await next();
//     } catch (error) {
//         ctx.body = "服务器有点问题，你等一下"
//     }
// }

// module.exports = catchError


// 处理异常四：三是全局监听异常，但它是直接将异常信息返回给用户，这样是不太合适的，我们需要将
// 异常信息处理一下，将有用的、整洁的异常信息返回给前端或者用户
// 这里采用的是面向对象方式，基于Error基类再创建一个类，更好地分装处理我们的错误信息
// 捕获处理异常四、
const {HttpException} = require("../core/http-exception");

const catchError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // 捕获已知异常，若是开发环境则直接抛出到控制台，若是生产环境则走下面的处理异常信息
        // 补充：若是开发环境且不是HttpException才直接抛出异常信息
        const isHttpException = error instanceof HttpException;
        const isDev = (global.config.environment === "dev");

        if(isDev && !isHttpException) {
            throw error;
        }

        // 整理异常信息
        if(error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                require: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code;
        }
        // 捕获未知异常
        else {
            ctx.body = {
                msg: "we made a mistake",
                error_code: 999,
                require: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500;
        }
    }
}

module.exports = catchError;