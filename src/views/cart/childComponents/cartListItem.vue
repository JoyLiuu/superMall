<template>
<div class="shop-item">
<!--{{product}}-->
  <div class="item-selector">
    <checkButton :is-checked="product.checked" @click.native="checkClick"></checkButton>
  </div>
  <div class="item-img">
    <img :src="product.image" alt="商品图片">
  </div>

  <div class="item-info">
    <div class="item-title">{{product.title}}</div>
    <div class="item-desc">{{product.desc}}</div>
    <div class="info-bottom">
      <div class="item-price left">{{product.price}}</div>
      <div class="item-count right">×{{product.count}}</div>
    </div>
  </div>

</div>
</template>

<script>
import checkButton from "@/components/content/checkButton/checkButton";
export default {
  name: "cartListItem",
  data(){
    return{
      localProduct:this.product
    }
  },
  props: {
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    checkButton
  },
  methods:{
    checkClick(){
      this.product.checked = !this.product.checked
      // this.$store.dispatch('addCart',this.product)   why ??
    }
  }
}
</script>

<style scoped>
.shop-item{
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img{
  padding: 5px;
}
.item-img img{
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info .item-desc{
  font-size: 10px;
  position: absolute;
  bottom: 50px;
  left: 10px;
  right: 10px;
}
.info-bottom{
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price{
  color: orangered;
}
</style>