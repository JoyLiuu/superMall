import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'


export default {
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}


    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成单一事件
    //所以以下事件不适合在mutations中处理，应该放到actions
    // addCart(state,payLoad){  //payload是mutation的载荷，通过mutation更新数据时，携带的参数，payload也可以是对象
    //     //1.查找之前数组中是否有该商品
    //     let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)
    //
    //     //2.判断oldProduct
    //     if(oldProduct){
    //         oldProduct.count += 1;
    //     }else{
    //         payLoad.count = 1;
    //         //payload新添加的商品
    //         state.cartList.push(payLoad)
    //     }
    // }
    // addCounter(state,payload){
    //     payload.count++  //oldProduct.count++
    // },
    // addToCart(state,payload){
    //     state.cartList.push(payload)
    // }


