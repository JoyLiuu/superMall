<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <!--    注意下排的probeType="3"传的是字符串，:probeType="3"才是数字-->
    <scroll class="detail-wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!--  测试加入购物车点击    <div>{{$store.state.cartList.length}}</div>-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
      <!--      <toast :message="message"  :show="show"/>-->
    </scroll>
    <back-top/>
    <detail-bottom-bar @addCart="addToCart"/>

  </div>

</template>

<script>
import detailNavBar from "@/views/detail/childComponents/detailNavBar";
import detailSwiper from "@/views/detail/childComponents/detailSwiper";
import detailBaseInfo from "@/views/detail/childComponents/detailBaseInfo";
import detailShopInfo from "@/views/detail/childComponents/DetailShopInfo";
import detailGoodsInfo from "@/views/detail/childComponents/DetailGoodsInfo";
import detailParamInfo from "@/views/detail/childComponents/DetailParamInfo";
import detailCommentInfo from "@/views/detail/childComponents/detailCommentInfo";
import detailBottomBar from "@/views/detail/childComponents/detailBottomBar";
import backTop from "@/components/common/backtop/BackTop";

import Scroll from "@/components/common/scroll/scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {debounce} from "@/components/common/utils";
import {itemListenerMixin} from "@/components/common/mixin";

import {mapActions} from "vuex"

export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    detailBottomBar,
    backTop,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index) 点击详情页顶部的菜单栏跳转到对应位置
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 注意此时scroll.vue里的probeType默认设置为0，不能监听到position，要在组件上绑定probeType
      // console.log(position)
      //  1.获取y值   这里如果用for in遍历出themeTopYs的值，需要对遍历出来的i进行转化成数字类型。参考底部讲解
      const positionY = -position.y
      // [0,a参数的offsetTop,b评论的offsetTop,c推荐的offsetTop]
      //  0 < positionY < a => index = 0
      //   a <= positionY < b => index = 1
      //   b <= positionY < c => index = 2
      //   c <= positionY  => index = 3
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1] || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      //  1.点击购物车获取需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //  2.将商品添加到购物车里(1.promise 2.mapActions)
      //   this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        this.$toast.show(res,2000)
      })
    }

  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    // this.iid = this.$route.query.iid  this.$router.params和query的区别:https://www.jianshu.com/p/776bfc6e65bf
    //  2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //2.1获取顶部的图片轮播数据
      const data = res.result
      // console.log(data)
      this.topImages = data.itemInfo.topImages
      //  2.2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //  2.3创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //  2.4保存商品详细数据
      this.detailInfo = data.detailInfo
      //  2.5获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //  2.6获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      /*
      //1.第一次获取 值不对
      //原因：这里的this.$refs.param.$el还未渲染
      this.getThemeTopY = debouce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
      })
      //2.第二次获取 值不对
      //原因：获取到最新的数据，加载，并把DOM渲染了，但是图片没有加载完，此时取得的offsetTop不包含其中的图片
      this.$nextTick(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      })*/

    })
    //  3.请求的推荐信息数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //  4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖提高性能）  在method里的imageLoad里调用
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
    }, 100)
  },
  mounted() {
    //这里用mixin抽取了防抖节流和图片的监听
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /*height: calc(100% - 93px);*/
}
</style>
<!--
一：在本页面中 点击标题滚动到对应的主题的事件中  要在detail中监听标题的点击 获取到index 滚动到对应的主题
如何 正确的 获取所有主题的offsetTop？？
1.created肯定不可以 这里还不能获取元素
2.mounted也不可以  这里还没有获取到数据
3.获取到数据的回调中也不行  此时DOM没有渲染完
4.$nextTick也不可以  此时图片的高度没有被计算在内
5.只有在图片加载完成后，获取的高度才是正确的
二：for in     for of
for i in ...主要针对对象循环的遍历，i遍历出来的是对象的key，所以i遍历出来的值类型是字符串类型
for of循环数组
-->