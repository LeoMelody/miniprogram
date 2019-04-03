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

  },

  async getData() {
    let options = this.data.options
    await app.getDics(['season'])
    let season = this.data.seasonList.find(item => item.value === options.season)
    this.setData({
      season
    })
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
    
  }
})