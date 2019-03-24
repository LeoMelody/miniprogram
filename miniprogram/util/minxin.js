/*
 * @Author: leo 
 * @Date: 2019-03-23 23:41:27 
 * @Last Modified by:   leo 
 * @Last Modified time: 2019-03-23 23:41:27
 * mixinPage 暂时直接返回page
 */

const app = getApp()

export default function DDPage(options) {
  Page(mixinFn(options))
}

function baseOptions() {
  return {
    /**
     * 初始化数据
     */
    data: {
      isLoad: false,
      options: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.data.isLoad = true
      this.data.options = options
      if (app.globalData && app.globalData.openid) {

      }
      // if (!app.eventFlag && !app.isQueryError) { // 数据加载完成
      //   const page = getCurrentPages()[0]
      //   app.currentPage = page
      //   return
      // }
      // if (app.isQueryError) { // 查询User出错，再查询userInfo
      //   app.getDDUser().then(() => {
      //     this.getData()
      //   })
      //   return
      // }
      this.getData()
    },

    /**
     * 获取基础数据
     */
    getData() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
      return {
        title: '只能你用！不许分享！',
        path: '/pages/common/welcome/index'
      }
    },
  }
}

/**
 * 混入属性方法， 
 */
const mixinFn = (options) => {
  if (!options || typeof options !== 'object') {
    return baseOptions()
  }
  let data = Object.assign(baseOptions().data, options.data || {})
  options = Object.assign(baseOptions(), options)
  options.data = data
  return options
}