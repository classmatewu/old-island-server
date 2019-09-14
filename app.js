// 一、全部路由写在app.js文件中
// // 1、引入koa包
// const Koa = require("koa");
// // 1.1引入koa-router包
// const Router = require("koa-router");

// // 2、new一个Koa实例为app
// // const app = new Koa();
// // 1.2new一个Router实例：
// // const router = new Router();

// // 3、注册中间件
// // app.use((ctx, next) => {
// //     console.log("我是中间件1");
// //     next();
// // });

// // app.use((ctx, next) => {
// //     console.log("我是中间件2");
// //     next();
// // });

// // app.use(async (ctx, next) => {
// //     console.log(ctx.path); // 获取用户请求的api，即url中localhost:8080后面的字符串
// //     console.log(ctx.method); // 获取用户请求的方法，get、post等,浏览器的访问请求默认是get
// //     // 初级路由——if函数，根据请求做出不同的响应
// //     if(ctx.path === "/myfirst" && ctx.method === "GET") {
// //         // return "success"; // 这样的返回是无效的
// //         // ctx.body = "success" // 这样就会向用户的请求返回"success"字符串
// //         ctx = {key: "success"} // 这样就会向用户的请求返回一个json
// //     }
// //     if(ctx.path === "/...." && ctx.method === " ") {
// //         ...
// //     }
// // });

// // 2、使用router.xxx()函数
// router.get("/myfirst", (ctx, next) => {
//     // 注意，router.xxx()函数的第二个匿名函数参数其实也是一个中间件，并非所有的中间件都需要手动地注册到app.use()上
//     ctx.body = "success";
// })

// // 3、使用app.use() 将路由注册到中间件上
// app.use(router.routes());

// // 4、绑定监听端口
// app.listen(8080);



// 二、路由按照类别分类，各自写到./api/v1下，然后在app.js文件中逐一地去导入和注册
// const koa = require("koa"); // 引用npm下载来的包，就是"包名"，且引用后还要实例化
// const book = require("./api/v1/book"); // 引用自己定义的模块，就是"相对路径"，且引用后不用实例化，因为我们在自定义模块里已经有实例化了
// const classic = require("./api/v1/classic");

// const app = new koa();

// app.use(book.routes());
// app.use(classic.routes());

// app.listen(8080);




// 三、使用require-directory包，一次性地全部导入并且注册路由
// const Koa = require("koa");
// const Router = require("koa-router");
// const requireDirectory = require("require-directory");

// const app = new Koa();
// process.cwd();

// requireDirectory(module, "./app/api", {
//     visit: whenLoadModule
// });

// function whenLoadModule(aModuleObj) {
//     if(aModuleObj instanceof Router) {
//         app.use(aModuleObj.routes());
//     }
// }

// app.listen(8080);




// 四、将实现一次性导入并注册的路由模块的代码部分提取成一个js类，放到/core/init.js中
const Koa = require("koa");
const InitManager = require("./core/init"); // 引入InitManager类，引入类不用new一个实体
const parser = require("koa-bodyparser"); // 用于获取用户传递过来的body参数
const catchError = require("./middlewares/exception");
const authorize = require("./yiban");
const axios = require("axios");

const app = new Koa();


app.use((ctx, next) => {
    console.log("jsdf");
    ctx.body = "succeed"
    // axios.get("https://openapi.yiban.cn/oauth/authorize?client_id=f761080ac9d2d10a&redirect_uri=http://f.yiban.cn/djsdsfdfsdfsdfsdf")
    // .then(res => {
    //     console.log(res.data);
    // })
    // .catch(err => {
    //     console.log(err);
    // });


//  const params = {
//          client_id: 'f761080ac9d2d10a',
//          redirect_uri: 'http://f.yiban.cn/djsdsfdfsdfsdfsdf'
//      }
//      axios.request({
//          url: 'https://openapi.yiban.cn/oauth/authorize',
//          params,
//          method: 'get'
//      }).then(res => {
//             console.log(res);
//         })

});

// app.use(catchError); // 将catchError中间件注册到app.use()上来
// app.use(parser()); // 调用parser()得到中间件，将其注册到app.use()中

// InitManager.initCore(app); //调用InitManager类的入口函数initCore(),并传入参数app

app.listen(8888);