<template>
  <div class="car-bottom-bar">
    <div class="check-bottom">
      <check-button
          :is-checked="isCheckedAll"
          class="check-button"
          @click.native="checkClick"/>

      <span class="check-all">全选</span>

      <span class="count-all">合计:{{ totalPrice }}</span>
    </div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>

  </div>
</template>

<script>
import checkButton from "@/components/content/checkButton/checkButton";
import {mapGetters} from "vuex";

export default {
  name: "cartBottomBar",
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    //全选按钮
    isCheckedAll() {
      if (this.cartList.length === 0) return false  //购物车为空是默认是不全选中状态
      //方法1.使用filter  =>  数字取反结果为false
      // return !(this.cartList.filter(item => !item.checked).length)
      //  方法2.使用find 性能比方法1高
      //   return !this.cartList.find(item => !item.checked)
      //  方法3.普通遍历
      for (let item of this.cartList) {
        if (!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isCheckedAll) {  //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {  //部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isCheckedAll){
        this.$toast.show('请选择购买的商品',2000);
      }
    }
  }
}
</script>

<style scoped>
.car-bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;

}

.check-bottom {
  flex: 2;
  font-size: 16px;
  display: flex;
  flex-direction: row;
}

.count-all {
  margin-left: 15px;
}

.check-all {
  margin-left: 5px;
}

.calculate {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: red;
  color: #fff;
  padding: 0 10px;
}
</style>