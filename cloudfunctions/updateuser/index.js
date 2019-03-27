// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const userCollection = db.collection('user')
// 云函数入口函数
exports.main = async(event, context) => {
  console.log('?', event)
  let openid = event.openid
  let info = event.info || {}
  let result = await userCollection.where({
    openid
  }).get()

  try {
    if (result && result.data && result.data[0]) {
      // 更新用户
      let user = result.data[0]
      let userDoc = await userCollection.doc(user._id)
      await userDoc.set({
        data: {
          openid,
          ...info
        }
      })
    } else {
      // 添加用户
      await userCollection.add({
        data: {
          openid,
          ...info
        }
      })
    }
  } catch (err) {
    // no user
    return {
      code: '01',
      msg: '出错啦！'
    }
  }
  return {
    code: '00',
    msg: 'success'
  }
}