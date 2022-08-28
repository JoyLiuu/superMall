<template>
<div class="cartList">
  <scroll class="cart-content">
    <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :product="item">
    </cart-list-item>
  </scroll>
</div>
</template>

<script>
import cartListItem from "@/views/cart/childComponents/cartListItem";
import scroll from "@/components/common/scroll/scroll";
import {mapGetters} from "vuex";

export default {
  name: "cartList",
  components:{
    cartListItem,
    scroll
  },
  computed:{
    ...mapGetters({
      cartList:'cartList'
    })
  }
}
</script>

<style scoped>
.cart-content{
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>