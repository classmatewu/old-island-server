// 基于Error基类自定义抛出异常信息类，并且整理自己要抛出去的异常信息
class HttpException extends Error {
    constructor(msg="服务器异常", errorCode=10000, code=400) {
        super();
        this.errorCode = errorCode;
        this.code = code;
        this.msg = msg;
    }
}

// 基于HttpException编写的类
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super();
        this.code = 400;
        this.msg = msg || "参数错误";
        this.errorCode = errorCode || 10000
    }
}

module.exports = {
    HttpException,
    ParameterException
}