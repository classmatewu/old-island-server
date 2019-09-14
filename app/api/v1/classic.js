const Router = require("koa-router");
const {PositiveIntValidator} = require("../../validators/validator"); // 导入校验正整数的检验类
const {HttpException, ParameterException} = require("../../../core/http-exception"); // 引入HttpException异常抛出类

const router = new Router();

router.post("/v1/:id/classic/latest", (ctx, next) => {
    
    // 获取用户传递过来的参数
    const path = ctx.params;
    const query = ctx.request.query;
    const headers = ctx.request.header;
    const body = ctx.request.body;
    
    // 实例化校验类，并调用它的方法，传入ctx参数，因为id等参数都是在ctx上的，通过ctx才能找到id等参数
    const v = new PositiveIntValidator().validate(ctx);

    // 向用户返回响应结果
    ctx.body = { // ctx.body上挂载的是一个对象的话，那么返回给用户的就是一个json
        path,
        query,
        headers,
        body
    }
    // ctx.body = "dslkf"

    // 抛出异常
    // 调用HttpException类
    // if(true) {
    //     const error = new HttpException("为什么错误", 10001, 400);
    //     throw error;
    // }
    // 调用ParameterException类
    // abc // 未知异常
    // if(true) {
    //     const error = new ParameterException();
    //     throw error;
    // }

});

module.exports = router;