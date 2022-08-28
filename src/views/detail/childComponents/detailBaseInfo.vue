<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 8px 8px;
  color: #666;
  border-bottom: 5px solid #f2f5f8;
  font-size: 15px;
}

.info-price {
  padding: 8px 8px;
  font-size: 18px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}

.info-price .n-price {
  font-size: 18px;
  color: var(--color-high-text);
}

.info-price .o-price {
  color: #999;
  font-size: 12px;
  margin-left: 5px;
  text-decoration: line-through;
}

.info-price .discount {
  background-color: var(--color-high-text);
  border-radius: 12px;
  padding: 3px;
  font-size: 14px;
  margin-left: 5px;
  color: #fff;
}

.info-other {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-service{
  margin-top: 8px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
}
.info-service img{
  width: 12px;
}

</style>