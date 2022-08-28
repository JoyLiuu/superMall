<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item.index"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  //外部向组件传数据用props
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // console.log(index)  //0 1 2
    //  将点击事件从组件往外传出去用自定义事件emit
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 2px solid var(--color-high-text);
}
/*.tab-control-item:hover {*/
/*  color: #ff8198;*/
/*  border-bottom: 1px solid #ff8198;*/
/*}*/
</style>