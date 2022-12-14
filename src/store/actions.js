import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
// import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";
// import {resolve} from "@babel/core/lib/vendor/import-meta-resolve";

export default {
    addCart(context, payload) {
        return new Promise((resolve,reject) => {
            //1.查找之前数组中是否有该商品(payload是从detail组件传过来的product，再传给mutaition处理）
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //2.判断oldProduct
            if (oldProduct) {  //数量+1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前的商品数量+1')
            } else { //添加新商品
                payload.count = 1;
                //payload新添加的商品
                context.commit(ADD_TO_CART,payload)
                resolve('添加了新的商品')
            }
        })
    }
}