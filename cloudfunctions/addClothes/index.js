/**
 * 添加衣服
 */
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const clothes = db.collection('clothes')
// 云函数入口函数
exports.main = async (event, context) => {
  let data = event.params

  let res = await clothes.add({
    data
  })
  return {
    code: '00',
    msg: '添加成功',
    data: res
  }
}