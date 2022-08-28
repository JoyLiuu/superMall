<template>
  <div id='App'>
      <my-profile/>
    <main-tab-bar/>
  </div>
</template>

<script>
import mainTabBar from "@/components/content/mainTabbar/MainTabBar";
import myProfile from "@/views/profile/childComponents/myProfile";
  export default {
    name:'App',
    components:{
      mainTabBar,
      myProfile
    },
    props:{},
    data(){
    return {
      };
    },
    watch:{},
    computed:{},
    methods:{},
    created(){},
    mounted(){}
  };
</script>

<style scoped>

</style>