// 基于lin-validator自制校验器

const {LinValidator, Rule} = require("../../core/lin-validator"); // 导出LinValidator, Rule类

// 校验是否是正整数的类
class PositiveIntValidator extends LinValidator {
    constructor() {
        // super();
        this.id = [ // 这是个数组，可满足多个且关系的rule
            new Rule("isInt", "需要满足正整数", {
                min: 1
            }),

        ]
    }
}

// 编写一个校验注册信息的校验类
class RegisterValidator extends LinValidator {
    // 校验邮箱密码等单个的规范与否
    constructor() {
        super();
        this.email = [
            new Rule("isEmail", "不符合Email规范")
        ];

        this.password1 = [
            new Rule("isLength", "密码至少6个字符，最多32个字符", {
                min: 6,
                max: 32
            }),
            new Rule("matches", "", "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"),
        ];

        this.password2 = this.password1;

        this.nickname = [
            new Rule("isLength", "昵称不符合长度规范", {
                min: 4,
                max: 32
            }),
        ];
    }

    // 校验密码1与密码2的是否相同
    validatePassword(vals) {
        const psw1 = vals.body.password1;
        const psw2 = vals.body.password2;
        if(psw1 !== psw2) {
            throw new Error("两个密码必须相同");
        }
    }
}

module.exports = {
    PositiveIntValidator,
    RegisterValidator
}