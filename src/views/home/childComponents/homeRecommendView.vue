<template>
<div class="recommend">
  <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image">
      <p>{{item.title}}</p>
    </a>

  </div>
</div>
</template>

<script>
export default {
  name: "homeRecommendView",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 60px;
  height: 70px;
  padding-bottom: 10px;
}
</style>