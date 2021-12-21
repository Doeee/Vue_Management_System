import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import mallApi from './mockServerData/mall'
import userApi from './mockServerData/user'


//#region 首页
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)
//#endregion

//#region 商品管理
Mock.mock('/api/Mall/getData', 'get', mallApi.getMallData)
Mock.mock(RegExp('/api/Mall/delData' + ".*"), 'delete', mallApi.delMallData)
Mock.mock(RegExp('/api/Mall/modifyData' + ".*"), 'post', mallApi.modifyMallData)
//#endregion

//#region 用户管理
Mock.mock('/api/User/getAdmin', 'get', userApi.getAdminData);
Mock.mock('/api/User/getUser', 'get', userApi.getUserData);
Mock.mock('/api/User/getVisit', 'get', userApi.getVisitData);
Mock.mock(RegExp('/api/User/modifyData' + ".*"), 'post', userApi.modifyUserData)
Mock.mock(RegExp('/api/User/deleteData' + ".*"), 'delete', userApi.deleteUserData)
Mock.mock(RegExp('/api/User/addeData' + ".*"), 'post', userApi.addUserData)
//#endregion