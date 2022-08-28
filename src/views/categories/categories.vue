<template>
  <div id='categories'>
    <categories-nav-bar></categories-nav-bar>



    <main-tab-bar/>
  </div>
</template>

<script>
import mainTabBar from "@/components/content/mainTabbar/MainTabBar";
import categoriesNavBar from "@/views/categories/childComponents/categoriesNavBar";

export default {
  name: 'categories',
  components: {
    mainTabBar,
    categoriesNavBar
  },
  props: {},
  data() {
    return {
      scroll:null
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {

  },
  mounted() {
    // console.log(this.$refs.wrapper);
    // this.scroll = new BScroll(this.$refs.wrapper,{
    //   probeType:3,
    //   click:true,
    //   pullUpLoad:true
    // })
    // this.scroll.on('scroll',(position) => {
    //   // console.log(position)
    // })
    // this.scroll.on('pullingUp',() => {
    //   // console.log('上拉加载更多')
    //   setTimeout(() => {
    //     this.scroll.finishPullUp()
    //   },2000)
    // })
  }
};
</script>

<style scoped>
.wrapper{
  height: 100px;
  background-color: var(--color-high-text);
  overflow: hidden;
  /*overflow-y: scroll;*/
}
</style>