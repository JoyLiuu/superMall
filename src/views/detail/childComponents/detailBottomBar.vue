<template>
  <div class="bottom-bar">
    <div class="bar-item left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span></div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span></div>
    </div>
    <div class="bar-item right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBottomBar",
  methods:{
    addToCart(){
      this.$emit('addCart')
    }
  }

}
</script>

<style scoped>
.bottom-bar {
  /*给底部导航栏定位*/
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 -1px 1px rgba(0,0,0,.1);
}
.bar-item{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center
}
.bar-item>div{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }

.left .icon{
  width: 22px;
  height: 22px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left .shop{
  background-position: 0 -98px;
}
.left .service{
  background-position: 0 -52px;
}
.text{
  font-size: 13px;
}
.cart{
  height: 49px;
  background-color: #ffe817;
  color: #333;
  text-align: center;
  line-height: 49px;
}
.buy{
  height: 49px;
  background-color: pink;
  color: #fff;
  text-align: center;
  line-height: 49px;
}
</style>