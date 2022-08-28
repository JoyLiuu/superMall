<template>
<div class="myProfile">

  <div class="head">
    <div class="img">
      <div class="circle">
        <img src="" alt="">
      </div>
    </div>
    <div class="myInfo">
      <h4>账户名</h4>
      <p class="count">ID: 666666</p>
      <span>关注 0 | 粉丝 0</span>
    </div>
  </div>

  <div class="nav">
    <ul>
      <li>收藏</li>
      <li>订阅店铺</li>
      <li>足迹</li>
      <li>零钱</li>
    </ul>
  </div>

  <div class="order">
    <ul>
      <li>待付款</li>
      <li>待发货</li>
      <li>待收货</li>
      <li>待评价</li>
      <li>退款/售后</li>
    </ul>
  </div>
  <div class="info">
    <p class="address">地址</p>
    <p class="setting">设置</p>
    <p class="helpFeedBack">帮助与反馈</p>
    <p class="change">切换账号</p>
  </div>
</div>
</template>

<script>
export default {
  name: "myProfile"
}
</script>

<style scoped>
.myProfile{
  background-color: rgba(0,0,0,.03);
}
.head{
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head .img{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head .img .circle{
  width: 48px;
  height: 48px;
  background-color: pink;
  border-radius: 50%;
}
.head .count{
  font-size: 12px;
  padding: 5px 0;

}
.head span{
  font-size: 14px;
}
.myInfo{
  flex: 3;
}
.nav{
  display: flex;
}
.nav{
  display: flex;
}
.nav ul{
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.nav ul li{
  flex: 1;
  list-style: none;
  display: flex;
  justify-content: center;
}
.order{
  background-color: #fff;
  display: flex;
  font-size: 14px;
}
.order ul{
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.order ul li{
  flex: 1;
  list-style: none;
  display: flex;
  justify-content: center;
}
.info{
  display: flex;
  flex-direction: column;
}
.info p{
  flex: 1;
  width: 100%;
  height: 60px;
  border-bottom: 5px solid #fff;
  padding: 10px;
  font-size: 16px;
  letter-spacing: 1px;
  text-indent: 10px;
}
</style>