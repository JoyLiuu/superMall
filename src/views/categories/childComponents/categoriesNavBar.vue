<template>
<div class="categoriesNavBar">
  <nav-bar class="nav">
    <div slot="center">分类</div>
  </nav-bar>
</div>
</template>

<script>
import navBar from "@/components/common/navbar/NavBar";
export default {
  name: "categoriesNavBar",
  components:{
    navBar
  }
}
</script>

<style scoped>
.nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>