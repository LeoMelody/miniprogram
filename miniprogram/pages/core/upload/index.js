// pages/core/upload/index.js
const app = getApp();
import SPage from '../../../util/minxin.js'
import regeneratorRuntime from '../../../libs/runtime.js'
// 初始化数据库
const db = wx.cloud.database()

SPage({

  /**
   * 页面的初始数据
   */
  data: {
    title: '开始上传图片吧',
    uploadType: 'clothes'
  },  

  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        // 云服务器上传文件
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传] 成功：', res)
            // 数据库插入数据
            db.collection('clothes').add({
              data: {
                pic_id: res.fileID,
                name: '测试名称',
                createdTime: +new Date(),
                updateTime: +new Date(),
                owner_id: '123456', // 改为用户的openid
                type: '衣服', 
                tags: ['xxx', 'x'],
                description: 'heiheihei'
              },
              success: res => {
                console.log(res)
              }
            })            
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  },

  /**
   * 获取数据
   */
  getData() {
    // 设置当前上传类型
    let uploadType = this.data.options.type
    uploadType && this.setData({
      uploadType
    })  
  }
})