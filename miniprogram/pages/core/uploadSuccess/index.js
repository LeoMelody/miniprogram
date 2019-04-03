// pages/core/uploadSuccess/index.js
const app = getApp();
import SPage from '../../../util/minxin.js'
import regeneratorRuntime from '../../../libs/runtime.js'

SPage({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 获取数据
   */
  getData() {
    
  },

  /**
   * 返回首页
   */
  goHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  /**
   * 继续添加
   */
  uploadAgain() {
    wx.redirectTo({
      url: '/pages/core/upload/index',
    })
  }
})