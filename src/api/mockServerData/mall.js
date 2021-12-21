import Mock from 'mockjs'
// 导入nanoid库
import { nanoid } from "nanoid";

// mall数据
let List = []
export default {
  getMallData: () => {
    if (List.length === 0) {
      for (let i = 0; i < 150; i++) {
        const { randomName, randomNum } = Mock.mock({ randomName: Mock.Random.cword(3, 5), randomNum: Mock.Random.integer(1, 12) });
        List.push(
          Mock.mock({
            id: nanoid(),
            date: `2021-${Mock.Random.integer(1, 12)}-${Mock.Random.integer(1, 28)}`,
            name: `${randomName}-${randomNum}`,
            info: `${randomName}公司第${randomNum}代手机`,
            area: `${Mock.Random.region()}地区`,
            storeNum: Mock.Random.integer(1, 10000),
            saleNum: Mock.Random.integer(1, 10000),
            goodComment: Mock.Random.float(1, 100, 0, 0),
          })
        )
      }
    }
    return {
      code: 20000,
      data: List
    }
  },
  delMallData: options => {
    const body = JSON.parse(options.body);
    const id = body['id'];
    List = List.filter(u => u.id !== id)
    return {
      code: 10000,
      data: {
        message: '删除成功'
      }
    }
  },
  modifyMallData: options => {
    const body = JSON.parse(options.body);
    List = List.map(item => {
      if (item.id === body.id) {
        return body;
      }
      else {
        return item;
      }
    })

    return {
      code: 2000
    }
  }
}