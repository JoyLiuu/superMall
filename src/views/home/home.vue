<template>
  <div id='Home'>
    <!--    首页导航栏    -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行','新款','精选']"
        ref="tabControl1"
        @tabClick="tabClick"
        @swiperImageLoad="swiperImageLoad"
        v-show="isTabFixed"
        :class="{fixed:isTabFixed}"/>

    <scroll class="home-wrapper"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 如果probe-type前不绑定v-bind（:），引号内默认为字符串，此处要求传入数字型-->
      <!--    轮播图     -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <!--    ul>li{列表$}*50       p{列表$}*50-->

      <!--    商品列表    -->
      <tab-control
          :titles="['流行','新款','精选']"
          ref="tabControl2"
          @tabClick="tabClick"
          @swiperImageLoad="swiperImageLoad"/>
      <good-list :goods="showGoods"/>
    </scroll>


    <!--组件不能直接监听原生事件，需要添加native进行原生事件监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <main-tab-bar/>

  </div>
</template>

<script>
//子组件类
import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import HomeRecommendView from "@/views/home/childComponents/homeRecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";
import mainTabBar from "@/components/content/mainTabbar/MainTabBar";
//公共类组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/scroll";
import BackTop from "@/components/common/backtop/BackTop";
//接口类
import {getHomeMultidata, getHomeGoods} from "@/network/home";
// import {debounce} from "@/components/common/utils";该内容已抽取到mixin内
import {itemListenerMixin} from "@/components/common/mixin";

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    mainTabBar,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin],
  props: {},
  data() {
    return {
      //1.轮播图部分
      // result:null,
      banners: [],
      recommends: [],
      //商品列表部分
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,  //默认设置为隐藏
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      //注意这里的两个this记得加
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关方法-------------------------------------
     */
    //tabControl的监听与控制
    tabClick(index) {
      // console.log(index)//index为点击的某一个tabcontrol
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // this.showGoods = this.goods[this.currentType].list?????课程p204 13:47处
      // console.log(this.$refs.tabControl1)
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    //通过调用scroll内的scrollTo获取实时位置
    backClick() {
      // console.log(this.$refs.scroll)
      this.$refs.scroll.scrollTo(0, 0)
    },

    //监听页面的滚动位置
    contentScroll(position) {
      //1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //  2.决定tabcontrol是否吸顶（position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //监听下拉加载更多   通过监测实时位置操作backTop组件的显示和隐藏(v-show)
    loadMore() {
      // console.log('监听滚动到底部')
      this.getHomeGoods(this.currentType)
    },
    //监听轮播图是否加载完成
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法----------------------------------------
     */
    //1.请求多个数据(此处请求的是轮播图的数据）
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        //函数调用结束后res会被内存回收失效，要在失效前拿到res的结果
        //在data内定义一个result，将res值赋值给result，此处this是指向当前组件对象（NavBar）的
        //复习箭头函数的this指向
        // this.result = res;//此项目中只需要获得的数据的部分数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    //  2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  created() {
    // console.log('我在home.vue的created里')
    //created内部尽量只写主要逻辑，具体的方法实现封装到method里面
    //请求轮播图板块多个数据
    this.getHomeMultidata()
    //  2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //这个地方img标签被挂载但是其中的图片还没有占高度
    //1.图片加载完成的事件监听
    //这里内容用mixin抽取了 防抖节流 和 图片的监听

    //  2.获取tabcontrol的offsetTop    所有组件都有一个属性$el，用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop)
  },

  destroyed() {
    console.log('首页销毁')
  },
  activated() {
    // console.log('activated')
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated')
    //1.离开首页跳转到其他页面时保留首页的位置：Y值
    this.saveY = this.$refs.scroll.getScrollY()
  //  2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
};
</script>

<style scoped>
#Home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  /*background-color: #ff8198;*/
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.fixed{
  position: relative;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}

.home-wrapper {
  /*height: calc(100% - 93px ) ;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  white-space: nowrap;
}
</style>