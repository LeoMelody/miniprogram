//login.js
//获取应用实例
const app = getApp();
import SPage from '../../../util/minxin.js'
import regeneratorRuntime from '../../../libs/runtime.js'

SPage({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    downTime: 4,
    auth: false,
    downTimer: null
  },
  async onReady() {
    var that = this;
    let auth = await app.checkAuth()
    this.setData({
      auth
    })
    // loading
    setTimeout(function() {
      if (auth) {
        that.downTimeFun()
      }
      that.setData({
        remind: ''
      });
    }, 1000);
  },
  async onGetUserInfo(e) {
    if (!e || !e.detail || !e.detail.iv || !e.detail.signature || !e.detail.encryptedData) {
      // 拒绝授权则返回
      wx.showModal({
        title: '哼',
        content: '你怎么点拒绝啊，退出再试一下吧',
        showCancel: false
      })
      return 
    }
    
    await app.refreshUserInfo()
    clearInterval(this.data.downTimer)
    this.setData({
      downTimer: null
    })
    let time = 0
    // 未授权
    if (!this.data.auth) {
      time = 1500
      wx.showToast({
        title: '开始吧！',
        icon: 'none',
        duration: 1500
      })
    }
    setTimeout(()=> {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, time)
  },

  /**
   * 倒计时方法
   */
  downTimeFun() {
    this.data.downTimer = setInterval(() => {
      let downTime = this.data.downTime
      if (downTime <= 0) {
        clearInterval(this.data.downTimer)
        this.setData({
          downTimer: null
        })
        wx.switchTab({
          url: '/pages/index/index',
        })
        return 
      }
      this.setData({
        downTime: downTime - 1
      })
    }, 1000)
  }
});