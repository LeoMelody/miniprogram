// pages/search/index.js
const app = getApp();
import SPage from '../../util/minxin.js'
import regeneratorRuntime from '../../libs/runtime.js'

SPage({

  /**
   * 页面的初始数据
   */
  data: {
    season: {}
  },

  async getData() {
    let options = this.data.options
    await this.getDics(['season'])
    let season = this.data.seasonList.find(item => item.value === options.season)
    this.setData({
      season
    })
    await this.getSearchList()
  },

  /**
   * 获取字典
   */
  async getDics(list = []) {

    // 是否可以优化一下？
    await Promise.all(list.map(async dic => {
      let data = await wx.cloud.callFunction({
        name: 'getDic',
        data: {
          dic
        }
      })
      let obj = {}
      this.setData({
        seasonList: data.result.data
      })
    }))
  },

  /**
   * 获取搜索列表
   */
  getSearchList() {

  }
})