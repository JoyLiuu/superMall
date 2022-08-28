<template>
<div class="toast">
  <div v-show="isShow">{{message}}</div>
</div>
</template>

<script>
export default {
  name: "toast",
  // props:{
  //   message:{
  //     type:String,
  //     default:''
  //   },
  //   show:{
  //     type:Boolean,
  //     default: false
  //   }
  // },
  data(){
    return{
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration){
    this.isShow = true;
    this.message = message;
    setTimeout(() => {
      this.isShow = false;
      this.message = '';
    },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  padding: 5px 10px;
  border-radius: 10%;
  background-color: rgba(0,0,0,.7);
  z-index: 999;
}
</style>