/**
 * 基础behavior
 */

export default Behavior({
  properties: {

  },
  data: {},
  attached: function () {},
  methods: {
    $emit: function () {
      this.triggerEvent.apply(this, arguments)
    }
  }
})