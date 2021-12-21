import axios from "./axios";

export const getMenu = () => {
  return axios.request({
    url: 'menu',
    method: 'get'
  })
}


//#region 首页
export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}
//#endregion

//#region 商品管理
export const getMall = () => {
  return axios.request({
    url: '/Mall/getData',
    method: 'get'
  })
}

export const delMall = (params) => {
  return axios.request({
    url: '/Mall/delData',
    data: params,
    method: 'delete'
  })
}

export const modifyMall = (params) => {
  return axios.request({
    url: '/Mall/modifyData',
    data: params,
    method: 'post'
  })
}
//#endregion

//#region 用户管理
export const getAdmin = () => {
  return axios.request({
    url: '/User/getAdmin',
    method: 'get'
  })
}
export const getUser = () => {
  return axios.request({
    url: '/User/getUser',
    method: 'get'
  })
}
export const getVisit = () => {
  return axios.request({
    url: '/User/getVisit',
    method: 'get'
  })
}

export const modifyUser = (params) => {
  return axios.request({
    url: '/User/modifyData',
    data: params,
    method: 'post'
  })
}

export const deleteUser = (params) => {
  return axios.request({
    url: '/User/deleteData',
    data: params,
    method: 'delete'
  })
}

export const addUser = (params) => {
  return axios.request({
    url: '/User/addeData',
    data: params,
    method: 'post'
  })
}
//#endregion