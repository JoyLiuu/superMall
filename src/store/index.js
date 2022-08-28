import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
//1.安装插件  这里安装的VUEX3.6.0版本
Vue.use(Vuex)

//2.创建store对象
const state = {
    cartList: []
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//3.挂载到vue实例上
export default store

//vuex官方文档
//https://v3.vuex.vuejs.org/zh/guide/#%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84-store