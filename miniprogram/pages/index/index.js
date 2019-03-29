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
    list: [
      {
        name: '春'
      },
      {
        name: '夏'
      },
      {
        name: '秋'
      },
      {
        name: '冬'
      }
    ],
    
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

  }
})
