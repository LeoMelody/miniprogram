import baseBehaviors from '../mixin/baseBehaviors'
// import computedBehavior from 'miniprogram-computed'
import computedBehavior from './computed-behavior'
// TODO 此处暂时仅做options配置，更多配置后面再补充
const externalClasses = ['title-class', 'content-class', 'self-class', 'footer-class']

function DDComponent(options) {
  !options && (options = {})
  // options
  options.options = {
    multipleSlots: true,
    addGlobalClass: false
  }
  // behaviors
  // 这里引入computedBehavior会影响小程序单元测试，但是有些组件确实依赖于computed，那么
  options.behaviors = mixinAttrs(options.behaviors, [baseBehaviors, computedBehavior])
  // externalClasses
  options.externalClasses = mixinAttrs(options.externalClasses, externalClasses)
  Component(options)
}

/**
 * 混合属性
 * @param baseAttrs 初始属性
 * @param mixinAttrs 要混入的属性
 */
function mixinAttrs(baseAttrs, mixinAttrs) {
  if (!baseAttrs) {
    return mixinAttrs
  }

  if (Object.prototype.toString.call(baseAttrs) === '[object Array]') { // 数组
    baseAttrs.push(...mixinAttrs)
  } else if (Object.prototype.toString.call(baseAttrs) === '[object Object]') { // 对象
    baseAttrs = Object.assign(mixinAttrs, baseAttrs)
  }

  return baseAttrs
}

export {
  DDComponent
}