const request = require('request'); //请求插件
const CryptoJS = require('crypto-js'); //解密插件

var APPID = "f761080ac9d2d10a";//应用APPID
var APPSECRET = "14e6cb71dadeb03fc5998ec8fdae5937";//应用APPSceret

//先格式化密钥和向量
const key = CryptoJS.enc.Utf8.parse(APPSECRET);
const iv = CryptoJS.enc.Utf8.parse(APPID);


const CALLBACK = "http://f.yiban.cn/djsdsfdfsdfsdfsdf";//应用站内地址
// 获取用户授权的重定向地址
const getCodeUrl = `https://openapi.yiban.cn/oauth/authorize?client_id=${APPID}&redirect_uri=${CALLBACK}`;

//这里也判断有无授权信息

const authorize = (req, res, next) => {
     let CODE = req.query.code; //刚开始用户是否带着令牌code
     let postInfo = req.query.verify_request; //解密
     let uid = req.query.yb_uid;
   
     if (!postInfo) {//不是第一次进入则到下面判断是否有用户信息，没有再跳转。
        next();
        return;
     }

     if (!CODE) {
         postInfo = Decrypt(postInfo); //解密
         postInfo = postInfo.replace(/([^\"\}\}]+)$/g, "");//去除结尾的所有空格
         postInfo = JSON.parse(postInfo);//解析

         if(!postInfo['visit_oauth']) {//未授权
               res.writeHead(302, {'REDIRECT': '/redirect'});
               res.end();//跳转至授权页面
               //res.redirect(getCodeUrl);
               return;
         } else {
            let authorization = {
                userid:postInfo.visit_user.userid,
                access_token:postInfo.visit_oauth.access_token,
                token_expires:postInfo.visit_oauth.token_expires
             }
             //存储授权信息
             req.session.authorization = authorization; 
             next();
         }
         
     } else {
         let getTokenUrl = "https://openapi.yiban.cn/oauth/access_token";
         let params = {
             client_id: APPID,
             client_secret: APPSECRET,
             code: CODE,
             redirect_uri: CALLBACK
         };
         // 发起获取access_token请求
         request.post({
             url: getTokenUrl,
             form: params
         }, (error, response, body) => {
             if (!error && response.statusCode == 200) { //获取access_token
                 let result = JSON.parse(body);
                 if (result.access_token) {
                 		//存储授权信息
                     req.session.authorization = result;
                     next();  
                 } else {
                    console.log("请求错误",result.info.code);
                    res.json({
                        status:"1",
                        msg:"请求错误",
                        reult:[]
                    });
                 }
             } else {
                 console.warn("请求错误");
                  res.json({
                        status:"1",
                        msg:"请求错误",
                        reult:[]
                    });
             }
         });
     }
}

const Decrypt = (word) => {//解密模块
    //由于加密后的密文为128位的字符串，那么解密时，需要将其转为Base64编码的格式。
    // 拿到字符串类型的密文需要先将其用Hex方法parse一下
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);//
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr); // 只有Base64类型的字符串密文才能对其进行解密
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding//第三方加密没有偏移
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}


module.exports = authorize;