// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const dics = db.collection('dictionaries')
// 云函数入口函数
exports.main = async (event, context) => {
  let dic = event.dic
  let res = await dics.where({
    dic_name: dic
  }).get()
  let data = res.data[0].dic_data
  return {
    code: '00',
    msg: '查询成功',
    data
  }
}