<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img v-for="(item,index) in commentInfo.images" :src="item" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/components/common/utils";

export default {
  name: "detailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      //  1.将时间戳转成date对象
      const date = new Date(value * 1000)
      //  2.将date格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.comment-info {
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  display: flex;
  justify-content: space-between;
  padding: 13px 10px;
  border-bottom: 3px solid #f2f5f8;
}
.header-more{
  font-size: 14px;
}
.info-user img{
  width: 24px;
  margin: 10px 16px 10px 10px;
  vertical-align: middle;
}
.info-detail{
  margin: 0 10px;
  font-size: 14px;
  color: #999;
}
.info-detail p{
  margin-bottom: 10px;
  color: #666;
}
.info-imgs img{
  width: 100px;
  margin: 10px 5px 0 0;
}
.info-other span:nth-child(2){
  margin-left: 10px;
}
</style>