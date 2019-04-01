// pages/core/upload/index.js
const app = getApp();
import SPage from '../../../util/minxin.js'
import regeneratorRuntime from '../../../libs/runtime.js'
import { uploadImg } from '../../../util/upload.js'
// 初始化数据库
const db = wx.cloud.database()

SPage({

  /**
   * 页面的初始数据
   */
  data: {
    title: '开始上传图片吧',
    uploadType: 'clothes',
    imgList: [],
    seasonList: [],
    season: {},
    clothesType: '',
    price: '',
    description: '',
    name: ''
  },  

  /**
   * 选择图片
   */
  chooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let imgList = this.data.imgList
        imgList = imgList.concat(res.tempFilePaths || [])
        this.setData({
          imgList
        })
      }
    })
  },

  /**
   * 预览图片
   */
  previewImg(e) {
    let imgList = this.data.imgList
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: imgList[index],
      urls: imgList,
    })
  },

  /**
   * 删除图片
   */
  clearImg(e) {
    let imgList = this.data.imgList
    let index = e.currentTarget.dataset.index
    imgList.splice(index, 1)
    this.setData({
      imgList: imgList
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
    this.getDics(['season'])  
  },

  /**
   * 获取字典
   */
  async getDics(list = []) {
    await Promise.all(list.map(async dic => {
      let data = await wx.cloud.callFunction({
        name: 'getDic',
        data: {
          dic
        }
      })
      let obj = {}
      obj[`${dic}List`] = data.result.data
      this.setData(obj)
    }))
  },

  /**
   * 选择季节
   */
  chooseSeanson(e) {
    let seasonIndex = e.detail.value
    let season = this.data.seasonList[seasonIndex]
    this.setData({
      season
    })
  },

  /**
   * form input 输入
   */
  formItemInput(e) {
    let attr = e.currentTarget.dataset.type
    let value = e.detail.value
    this.data[attr] = value
  },

  /**
   * 开始上传图片
   */
  async startUpload() {
    await this.uploadClothesPic()
    this.submit()
  }, 

  /**
   * 上传衣物图片
   */
  async uploadClothesPic() {
    let imgList = this.data.imgList
    let pathList = []
    await Promise.all(imgList.map(async img => {
      let date = +new Date()
      let postfix = img.match(/\.[^.]+?$/)[0]
      let fileId = await uploadImg({
        postfix,
        destPath: 'clothes',
        img
      }) 
      pathList.push(fileId)
    }))
    this.setData({
      pathList
    })
  },
  /**
   * 提交信息
   */
  async submit() {
    let owner = app.globalData.openid
    let params = {
      pictures: this.data.pathList,
      name: this.data.name,
      createdTime: +new Date(),
      updateTime: +new Date(),
      owner_id: owner, // 改为用户的openid
      type: this.data.clothesType,
      description: this.data.description,
      price: this.data.price,
      season: this.data.season.value
    }
    await wx.cloud.callFunction({
      name: 'addClothes',
      data: {
        params
      }
    })
    wx.showToast({
      title: '添加成功'
    })
  }

  /**
   * 
   * 
   *  wx.showLoading({
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
   */
})