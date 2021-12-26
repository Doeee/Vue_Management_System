import Mock from 'mockjs'
// 导入nanoid库
import { nanoid } from "nanoid";

// user数据
let adminListInit = 0
let adminList = [
  {
    id: nanoid(),
    type: "1",
    date: `2020-12-1`,
    username: 'admin',
    password: '123456',
    operateButton: true,
    authority: ["首页", "商品管理", "用户管理"]
  }
]
let userList = []
let userListInit = 0
let visitList = []
let visitListInit = 0
export default {
  getAdminData: () => {
    if (adminListInit === 0) {
      adminListInit = 1;
      for (let i = 0; i < 5; i++) {
        adminList.push(
          Mock.mock({
            id: nanoid(),
            type: "1",
            date: `2021-${Mock.Random.integer(1, 12)}-${Mock.Random.integer(1, 28)}`,
            username: Mock.Random.cname(),
            password: Mock.Random.integer(100000, 900000),
            operateButton: true,
            authority: ["首页", "商品管理", "用户管理"]
          })
        )
      }
    }
    return {
      code: 10000,
      adminList: adminList
    }
  },
  getUserData: () => {
    if (userListInit === 0) {
      userListInit = 1;
      for (let i = 0; i < 5; i++) {
        userList.push(
          Mock.mock({
            id: nanoid(),
            type: "2",
            date: `2021-${Mock.Random.integer(1, 12)}-${Mock.Random.integer(1, 28)}`,
            username: Mock.Random.cname(),
            password: Mock.Random.integer(100000, 999999),
            operateButton: true,
            authority: ["首页", "商品管理"]
          })
        )
      }
    }
    return {
      code: 10000,
      userList: userList
    }
  },
  getVisitData: () => {
    if (visitListInit === 0) {
      userListInit = 1;
      for (let i = 0; i < 5; i++) {
        visitList.push(
          Mock.mock({
            id: nanoid(),
            type: "3",
            date: `2021-${Mock.Random.integer(1, 12)}-${Mock.Random.integer(1, 28)}`,
            username: Mock.Random.cname(),
            password: Mock.Random.integer(10000, 99999),
            operateButton: true,
            authority: ["首页"]
          })
        )
      }
    }
    return {
      code: 10000,
      visitList: visitList
    }
  },
  modifyUserData: options => {
    const body = JSON.parse(options.body);
    if (body.type === '1') {
      adminList = adminList.map(item => {
        if (item.id === body.id) {
          return body;
        }
        else {
          return item;
        }
      })
    } else if (body.type === '2') {
      userList = userList.map(item => {
        if (item.id === body.id) {
          return body;
        }
        else {
          return item;
        }
      })
    } else if (body.type === '3') {
      visitList = visitList.map(item => {
        if (item.id === body.id) {
          return body;
        }
        else {
          return item;
        }
      })
    }
    return {
      code: 2000
    }
  },
  deleteUserData: options => {
    const body = JSON.parse(options.body);
    if (body.type === '1') {
      adminList = adminList.filter(item => {
        return item.id !== body.id
      })
    } else if (body.type === '2') {
      userList = userList.filter(item => {
        return item.id !== body.id
      })
    } else if (body.type === '3') {
      visitList = visitList.filter(item => {
        return item.id !== body.id
      })
    }
    return {
      code: 20000
    }
  },
  addUserData: options => {
    const body = JSON.parse(options.body);
    let newUser = { ...body };
    let dateNow = new Date(),
      monthNow = dateNow.getMonth() + 1,
      dayNow = dateNow.getDate()
    if (monthNow < 10) {
      monthNow = '0' + '' + monthNow
    }
    if (dayNow < 10) {
      dayNow = '0' + '' + dateNow.getDate()
    }
    let nowDay = dateNow.getFullYear() + '-' + monthNow + '-' + dayNow
    newUser.date = nowDay;
    newUser.id = nanoid();
    newUser.operateButton = true;
    if (newUser.type === "1") {
      adminList.push(newUser);
    } else if (newUser.type === "2") {
      userList.push(newUser);
    } else if (newUser.type === "3") {
      visitList.push(newUser);
    }
    if (body)
      return {
        code: 20000
      }
  }
}