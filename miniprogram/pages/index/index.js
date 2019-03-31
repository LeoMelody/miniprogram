//index.js
const app = getApp();
import SPage from '../../util/minxin.js'
import regeneratorRuntime from '../../libs/runtime.js'

SPage({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    collapse: false,
    collapseTimer: null,
    // testdata
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    
  },

  clickButton() {
    // clearTimeout(this.collapseTimer)
    let collapse = this.data.collapse
    this.setData({
      collapse: !collapse
    })
    // TODO 是否加上自动关闭呢？
    // if (!collapse) {
    //   this.collapseTimer = setTimeout(() => {
    //     this.setData({
    //       collapse: false
    //     })
    //   }, 3000)
    // }
  },

  /**
   * 添加组合
   */
  addCombinations() {
    console.log('addCombinations')
  },

  /**
   * 添加衣服
   */
  addClothes() {
    console.log('addClothes')
  },

  /**
   * 获取数据
   */
  getData() {

  },

  /**
   * 切换swiper
   */
  bindchange() {

  },

  /**
   *  选择季节
  */
  chooseSeason(e) {
    let season = ''
    try {
      season = e.currentTarget.dataset.season 
    } catch(err) {
      season = 'spring'
    }
    wx.navigateTo({
      url: `/pages/search/index?season=${season}`,
    })
  },

  /**
   * 只能搜索
   */
  search(e) {
    let value = e.detail.value
  },

  /**
   * 上传衣物图片
   */
  goUpload(e) {
    let uploadType = ''
    try {
      uploadType = e.currentTarget.dataset.type
    } catch(err) {
      uploadType = 'clothes'
    }
    wx.navigateTo({
      url: `/pages/core/upload/index?type=${uploadType}`
    })
  }
})
