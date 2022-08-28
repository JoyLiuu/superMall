import Vue from 'vue'
import VueRouter from "vue-router";

const home = () => import('../views/home/home')
const categories = () => import('../views/categories/categories')
const cart = () => import('../views/cart/cart')
const profile = () => import('../views/profile/profile')
const detail = () => import('../views/detail/detail')
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/categories',
        component: categories
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/detail/:iid',
        component: detail
    }

]
const router = new VueRouter({
    routes,
    mode: "history"
})

/**
 * push或replace方法中没有捕获异常
 * 重写push或者replace方法
 * 捕获异常
 */
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.replace = function replace(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router