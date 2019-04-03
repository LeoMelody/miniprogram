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
    if (this.currentPage && typeof this.currentPage.getData === 'function') {
      this.currentPage.getData()
    }
    if (await this.checkAuth()) {
      this.refreshUserInfo()
    }
  },

  /**
   * 刷新笨笨信息
   */
  async refreshUserInfo(flag) {
    let info = await this.getUserInfo()
    let rawData = JSON.parse(info.rawData)
    if (!flag && rawData === wx.getStorageSync('rawData')) return
    wx.setStorageSync('rawData', rawData)
    // TODO 更新信息 这一块不做过多的考虑，因为只有一个用户
    let result = await wx.cloud.callFunction({
      name: 'updateuser',
      data: {
        openid: this.globalData.openid,
        info: rawData
      }
    })
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
  globalData: {},

  /**
   * 公共方法
   */
  async getDics(list = []) {
    let page = getCurrentPages()[0]
    await Promise.all(list.map(async dic => {
      let obj = {}
      if (!wx.getStorageSync(dic)) {
        let data = await wx.cloud.callFunction({
          name: 'getDic',
          data: {
            dic
          }
        })
        wx.setStorageSync(dic, data.result.data)
      }
      obj[`${dic}List`] = wx.getStorageSync(dic)
      page.setData(obj)
    }))
  }
})
