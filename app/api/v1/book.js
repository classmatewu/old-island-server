const Router = require("koa-router");

const router = new Router();

router.get("/v1/book/latest", (ctx, next) => {
    ctx.body = { // ctx.body上挂载的是一个对象的话，那么返回给用户的就是一个json
        key: "book"
    }
});

module.exports = router;