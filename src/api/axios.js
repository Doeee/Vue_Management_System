//二次封装axios拦截器

import axios from 'axios'
import config from '../config/index'

//设置配置 根据开发 和 生产环境不一样
const baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequst {
  constructor(baseUrl) {
    this.baseURL = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      header: {

      }
    }
    return config;
  }
  interceptors(instance) {
    instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
      // Do something with response data
      return response.data;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  }

  request(options) {
    const instanse = axios.create();
    options = { ...(this.getInsideConfig()), ...options }
    this.interceptors(instanse);
    return instanse(options);
  }
}

export default new HttpRequst(baseURL);