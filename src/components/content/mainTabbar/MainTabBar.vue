<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <template v-slot:item-icon>
          <img  src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
          <!-- <p slot="item-text">首页</p> -->
          <template v-slot:item-text><p>首页</p></template>
      </tab-bar-item>

      <tab-bar-item path="/categories">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/category_active.svg" alt="">
        </template>
          <!-- <p slot="item-text">分类</p> -->
          <template v-slot:item-text><p>分类</p></template>

      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/profile_active.svg" alt="">
        </template>
          <!-- <p slot="item-text">购物车</p> -->
          <template v-slot:item-text><p>购物车</p></template>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
          <!-- <p slot="item-text">我的</p> -->
          <template v-slot:item-text><p>我的</p></template>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

</style>
