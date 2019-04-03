// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const clothes = db.collection('clothes')
const combination = db.collection('combination')
const common = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let season = event.season
  let searchStr = event.searchStr
  let clothesList = []
  let combinationList = []
  if (season) {
    clothesList = await getClothesBySeason(season)
  } else {
    clothesList = await getClothesBySearch(searchStr)
  }

  return {
    code: '00',
    msg: '查询成功',
    data: {
      clothesList,
      combinationList
    }
  }
}

/**
 * 通过季节标记获取衣服集合列表
 */
async function getClothesBySeason(season) {
  let res =  await clothes.where({
    season
  }).get()
  return res.data
}

/**
 * 通过搜索字段多项查询
 */
async function getClothesBySearch(searchStr) {
  let res = await clothes.where(common.or([
    {
      name: searchStr
    },{
      type: searchStr
    },{
      season: searchStr
    }
  ])).get()
  return res.data
}

/**
 * TODO
 * 通过季节标记获取组合集合列表
 */
async function getCombinationBySeanson(season) {

}