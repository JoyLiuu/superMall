<template>
  <div id='cart'>

    <nav-bar class="nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

      <cart-list/>

    <cart-bottom-bar></cart-bottom-bar>
    <main-tab-bar/>
  </div>
</template>

<script>
import mainTabBar from "@/components/content/mainTabbar/MainTabBar";
import navBar from "@/components/common/navbar/NavBar";
import cartList from "@/views/cart/childComponents/cartList";
import cartBottomBar from "@/views/cart/childComponents/cartBottomBar";
import {mapGetters} from 'vuex'

export default {
  name: 'cart',
  components: {
    mainTabBar,
    navBar,
    cartList,
    cartBottomBar,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    //两种语法形式：
    //数组形式
    // ...mapGetters(['cartLength','cartList'])
    //对象形式
    ...mapGetters({
      length:'cartLength'
    })
  },
  methods: {},
  created() {
  },
  mounted() {
  }
};
</script>

<style scoped>
#cart{
  height: 100vh;
}
.nav {
  background-color: var(--color-tint);
  color: #fff;
}

</style>