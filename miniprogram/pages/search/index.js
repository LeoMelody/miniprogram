// pages/search/index.js
const app = getApp();
import SPage from '../../util/minxin.js'
import regeneratorRuntime from '../../libs/runtime.js'

SPage({

  /**
   * 页面的初始数据
   */
  data: {
    season: {},
    hasSearch: false,
    seasonList: [],
    clothesList: [],
    combinationList: []
  },

  async getData() {
    let options = this.data.options
    await app.getDics(['season'])
    if (options.season) {
      let season = this.data.seasonList.find(item => item.value === options.season)
      this.setData({
        season
      })
    }
    await this.getSearchList()
    this.setData({
      hasSearch: true
    })
  },

  /**
   * 获取搜索列表
   */
  async getSearchList() {
    let data = {}
    if (this.data.season && this.data.season.value) {
      data.season = this.data.season.value
    } else {
      data.searchStr = this.data.options.searchStr
    }
    console.log(data)
    let res = await wx.cloud.callFunction({
      name: 'intelligenceSearch',
      data: data
    })
    console.log(res)
    let clothesList = res.result.data.clothesList || []
    let combinationList = res.result.data.combinationList || []
    this.setData({
      clothesList,
      combinationList
    })
  }
})