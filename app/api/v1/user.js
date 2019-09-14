// 创建注册路由 即注册API

const Router = require("koa-router");
const {RegisterValidator} = require("../../validators/validator"); // 导入校验注册信息的校验类，即注册信息校验器

const router = new Router({
    prefix: "/v1/user" // new实例时传入一个js对象，传入一个前缀，即后面每次url地址默认前面有/v1/user
});

router.post("/register", async (ctx) => {
    const v = new RegisterValidator().validate(ctx);
});

module.exports = router;