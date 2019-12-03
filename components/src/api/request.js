/**
 * Created by jack on 2019/10/15.
 */
import axios from 'axios';
import querystring from 'querystring';
import Vue from 'vue';

let instance=axios.create({
    baseURL:'/api',
    //method:'POST',
    //headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data,headers){
        return querystring.stringify(data);
    }/*,function(data,headers){
        console.log(headers);
        return data;
    }*/]
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //config.data=querystring.stringify(config.data);
    //console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    //console.log('request error');

    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    //console.log('response error');
    //console.log(JSON.stringify(error,null,4));
    //console.log(error.response.status);
    console.log('网络错误');
    return Promise.reject(error);
});

export default instance;