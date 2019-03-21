//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    
  },

  goUpload() {
    wx.navigateTo({
      url: '/pages/core/upload/index',
    })
  }
})
