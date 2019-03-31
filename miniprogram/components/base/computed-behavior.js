/*
 * @Author: leo 
 * @Date: 2019-03-15 17:36:25 
 * @Last Modified by: leo
 * @Last Modified time: 2019-03-18 16:57:32
 * 给组件增加computed能力
 */
export default Behavior({
  lifetimes: {
    created() {
      this._computedCache = {}
      this._originalSetData = this.setData
      this.setData = this._setData
      this._doingSetData = false
    }
  },
  /**
   * 定义字段过滤器
   * @param defFields 使用该behavior的 component/behavior 对象
   * @param definitionFilterArr 该behavior所使用的behavior的definitionFilter 函数列表
   * @description 这个方法算是一个统一处理方法，会更改所有组件的表现。
   */
  definitionFilter(defFields, definitionFilterArr) {
    const computed = defFields.computed || {}
    const computedKeys = Object.keys(computed)
    // 计算 computed
    /**
     * @description 该方法为遍历定义的computed字段，并将所得到的值赋值到computedCache中
     * @returns 需要更新的值
     */
    const calcComputed = (scope) => {
      const needUpdate = {}
      const computedCache = scope._computedCache || scope.data
      
      // 如果没有写computed则不会触发这个
      for (let i = 0, len = computedKeys.length; i < len; i++) {
        const key = computedKeys[i]
        // 有无定义computed属性
        const getter = computed[key]

        if (typeof getter === 'function') {
          const value = getter.call(scope)

          if (computedCache[key] !== value) {
            needUpdate[key] = value
            computedCache[key] = value
          }
        }
      }

      return needUpdate
    }

    // 初始化 computed
    // 简单的说这个方法就是给propertise中的属性都增加observer属性
    const initComputed = () => {
      defFields.data = defFields.data || {}

      // 先将 properties 里的字段写入到 data 中
      const data = defFields.data
      const properties = defFields.properties
      const hasOwnProperty = Object.prototype.hasOwnProperty
      if (properties) {
        // eslint-disable-next-line complexity
        Object.keys(properties).forEach(key => {
          const value = properties[key]
          let oldObserver
          if (value === null || value === Number || value === String || value === Boolean || value === Object || value === Array) {
          /**
           * 简写转换
           */
            properties[key] = {
              type: value,
            }
          } else if (typeof value === 'object') {
            if (hasOwnProperty.call(value, 'value')) {
              // 处理值
              data[key] = value.value
            }

            if (hasOwnProperty.call(value, 'observer') && typeof value.observer === 'function') {
              oldObserver = value.observer
            }
          }
          
          // 重写observer，在监听到变动的时候，会先触发下面的方法，再去触发真正的observer中的方法
          // 这个方法其实是给每一个的属性都加了一个observer
          // 那么也就是只要组件传入的值不是默认值均会触发这个方法
          properties[key].observer = function (...args) {
            // setData方法
            const originalSetData = this._originalSetData

            if (this._doingSetData) {
              // eslint-disable-next-line no-console
              console.warn('can\'t call setData in properties')
              return
            }

            this._doingSetData = true

            // 计算 computed
            const needUpdate = calcComputed(this)
            /**
             * 此处只是做一个计算，如果在properties中使用了setData（类似于Vue组件对props属性进行了改值操作）
             * 这种做法是危险的⚠️/禁止的，所以这里会在doingSetData为true时调用setData方法，则会报出警告
             * 但是为什么没有影响程序的运行？
             * 这是因为这里设置了observe后，在方法中调用setData，实际上触发了setData和observe两个方法（先触发setData，后触发observer）
             * 所以值实际上是set进去了。不过按照规范来说，这样是不合理的
             * 而我们引入computed也是正是为了解决这一尴尬的问题的（computed只是一种语法糖）
             */

            // 做 computed 属性的 setData
            try {
              originalSetData.call(this, needUpdate)
            } catch(err) {}
            this._doingSetData = false

            if (oldObserver) oldObserver.apply(this, args)
          }
        })
      }

      // 计算 computed
      calcComputed(defFields, true)
    }

    initComputed()

    defFields.methods = defFields.methods || {}
    // 在methods中真正调用的setData方法
    // 重写setData方法
    defFields.methods._setData = function (data, callback) {
      const originalSetData = this._originalSetData
      if (this._doingSetData) {
        // eslint-disable-next-line no-console
        console.warn('can\'t call setData in computed getter function!')
        return
      }

      this._doingSetData = true
      // TODO 过滤掉 data 中的 computed 字段
      const dataKeys = Object.keys(data)
      for (let i = 0, len = dataKeys.length; i < len; i++) {
        const key = dataKeys[i]

        if (computed[key]) {
          console.warn('can\'t call setData in computed attribute')
          delete data[key]  
        } 
      } 
      // 做 data 属性的 setData
      originalSetData.call(this, data, callback)

      // 计算 computed
      const needUpdate = calcComputed(this)
      // 做 computed 属性的 setData
      // 这里在和使用单元测试的时候会报错，（parentNode属性undefined）
      // 我们
      // originalSetData.call(this, needUpdate)
      try {
        originalSetData.call(this, needUpdate)
      } catch(err) {}
      
      this._doingSetData = false
    }
  }
})
