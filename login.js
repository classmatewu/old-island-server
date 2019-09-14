import axios from 'axios'
import Qs from 'qs'
//QS是axios库中带的，不需要我们再npm安装一个
 
const params = {
    client_id: 'f761080ac9d2d10a',
    redirect_uri: 'http://f.yiban.cn/djsdsfdfsdfsdfsdf'
}

getElementById("#login").click({

    axios.request({
        url: 'https://openapi.yiban.cn/oauth/authorize',
        params,
        method: 'get'
    }).then(res => {
        console.log(res);
    });
})