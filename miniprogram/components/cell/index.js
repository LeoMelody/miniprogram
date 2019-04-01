// components/cell/index.js
import { DDComponent } from '../base/components.js'

DDComponent({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    showValue: {
      type: Boolean,
      value: true
    },
    showLabel: {
      type: Boolean,
      value: true
    },
    path: {
      type: String,
      value: ''
    },
    isLink: {
      type: Boolean,
      value: true
    },
    collapse: {
      type: Boolean,
      value: false
    },
    must: {
      type: Boolean,
      value: false
    },
    /**
     * 事件触发区域，一半 half  全部 all
     */
    triggerArea: {
      type: String,
      value: 'half'
    }
  },
  externalClasses: ['label-class', 'value-class', 'icon-class'],
  data: {
    isCollapse: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    linkEvent(e) {
      if (this.properties.collapse) {
        let flag = this.data.isCollapse
        this.setData({
          isCollapse: !flag
        })
      }
      if (!this.properties.isLink) { return }
      let url = this.data.path
      if (url) {
        wx.navigateTo({
          url
        })
      }
      this.$emit('click', e)
    },

    linkEventHalf(e) {
      if (this.data.triggerArea !== 'half') {
        return
      }
      this.linkEvent(e)
    },

    linkEventAll(e) {
      if (this.data.triggerArea !== 'all') {
        return
      }
      this.linkEvent(e)
    }
  }
})
