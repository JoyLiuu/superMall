<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "scroll",
  props: {
    //封装是否实时监听，默认为0，不侦测实时位置
    probeType: {     //这里用驼峰命名时，在标签内调用用 - 分隔：probe-type
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      // console.log('-------')
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
    //ref如果绑定在组件上，通过this.$refs.refname获取到该组件对象
    //ref如果绑定在普通元素上（如div标签），通过this.$refs.refname获取到的是该元素对象
    //1.创建BScroll对象--------------------------------------
    this.scroll = new BScroll(this.$refs.scroll, {
      probeType: this.probeType,//侦测滚动位置。0/1都是不侦测实时位置；2是只侦测手指滚动，手指离开即不侦测；3是只要滚动都侦测。默认为0
      pullUpLoad: this.pullUpLoad,
      click: true
    })
    //2.监听滚动位置----------------------------------------
    // this.scroll.scrollTo(0,0)  //scrollTo() 方法可把内容滚动到指定的坐标。
    // console.log(this.scroll)   //BScrollConstructor{}
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)  // 首页需要监听position，即在首页@scroll这个event
      })
    }
    //3.监听滚动到底部位置---------------------------------------
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('监听滚动到底部')
        this.$emit('pullingUp')
      })
    }
    // this.scroll.refresh()
    // this.scroll.on('refresh', () => {})  //监听实例的refresh事件
  }
}
</script>

<style scoped>

</style>