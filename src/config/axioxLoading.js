
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import {hex_md5} from '../assets/js/md5.js'
import hostName from './hostName'
//引入element 
import { Loading,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Loading)

// 配置axios请求头与baseUrl
axios.defaults.timeout=8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.defaults.withCredentials = true;

// http request 拦截器
var loadinginstace
axios.interceptors.request.use(
  config => {
    // element ui Loading方法
    loadinginstace = Loading.service({ fullscreen: true });
    //console.log(loadinginstace)
    // config.headers.pid = '30478fdd494233eb22a0b6dabc12f41e'
    // config.headers.timestamp=Date.parse(new Date())
    // config.headers.sign=hex_md5(config.headers.timestamp+config.headers.pid+ "321652e390b5fe2b7cb1d9ce34d50e51")
    config.baseURL = hostName
    return config
  },
  err => {
    loadinginstace.close()
    return Promise.reject(err)
  },
)
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => {
  loadinginstace.close()
  return Promise.reject(error)
})

export default axios
export function myPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(function (response) {
      resolve(response)
    })
    .catch(function (error) {
      if (error.response) {
        Message.error(error.response.data.message);
        console.log(error.response.data.message == '未登录')
        if(error.response.data.message == '未登录') {
          router.push('/')
        }
      } 
      reject(error)
    })
  })
}

export function myGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(function (response) {
      resolve(response)
    })
    .catch(function (error) {
      if (error.response) {
        Message.error(error.response.data.message);
        console.log(error.response.data.message == '未登录')
        if(error.response.data.message == '未登录') {
          router.push('/')
        }
      } 
      reject(error)
    })
  })
}

export function myDelete(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(function (response) {
      resolve(response)
    })
    .catch(function (error) {
      if (error.response) {
        Message.error(error.response.data.message);
        console.log(error.response.data.message == '未登录')
        if(error.response.data.message == '未登录') {
          router.push('/')
        }
      } 
      reject(error)
    })
  })
}