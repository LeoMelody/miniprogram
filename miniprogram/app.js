//app.js
import regeneratorRuntime from './libs/runtime.js'

App({
  currentPage: null,
  async onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData = {}
    await this.getOpenId()
    console.log('?')
    if (this.currentPage && typeof this.currentPage.getData === 'function') {
      this.currentPage.getData()
    }
  },

  /**
   * 刷新笨笨信息
   */
  async refreshUserInfo(flag) {
    let code = await this.userLogin()
    let info = await this.getUserInfo()
    if (!flag && info.rawData === wx.getStorageSync('rawData')) return
    let params = {
      code,
      ...info
    } 
    // TODO 更新信息 这一块不做过多的考虑，因为只有一个用户
  },
  /**
   * 获取授权信息
   */
  async checkAuth() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: async res => {
          if (res.authSetting['scope.userInfo']) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  /**
   * 用户登录code
   */
  async userLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          resolve(res.code)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        lang: 'zh_CN',
        withCredentials: true,
        success: res => {
          resolve({
            signature: res.signature,
            rawData: res.rawData,
            encryptedData: res.encryptedData,
            iv: res.iv
          })
        },
        fail: err => {
          reject(err)
        }
      })
    })

  },

  /**
   * 获取OpenId
   */
  getOpenId() {
    return new Promise((resolve,reject) => {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          this.globalData.openid = res.result.openid
          resolve(true)
        }
      })
    })
  },

  /**
   * 公共数据
   */
  globalData: {

  }
})
