<template>
<div class="check-button" :class="{check:isChecked}">
  <img src="@/assets/img/cart/tick.svg">
</div>
</template>

<script>
export default {
  name: "checkButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.check-button{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check{
  background-color: red;
  border-color: red;
}
</style>