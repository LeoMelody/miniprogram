// components/menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indicate: {
      type: String,
      value: 'index'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    shwo_slide_menu: true,
    // 控制动画
    slide_close_flag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 展示侧边栏
   */
    showSlideMenu() {
      this.setData({
        shwo_slide_menu: true,
        slide_close_flag: false
      })
    },

    /**
     * 关闭侧边栏
     */
    closeSlideMenu() {
      this.setData({
        slide_close_flag: true
      })
      setTimeout(() => {
        this.setData({
          shwo_slide_menu: false,
          slide_close_flag: false
        })
      }, 500)

    },

    preventTap() {
      return false
    }
  }
})
