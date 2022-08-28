//封装首页的网络请求

import{request} from "@/network/request";

export function getHomeMultidata(){
    return request({
        url:'/home/multidata'  //轮播图
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        //专门针对get请求的参数拼接
        params:{
            type,
            page
        }
    })
}






//知识点笔记，与项目无关
//函数调用->压入函数栈（保留函数调用过程中所有变量）
//函数调用结束->弹出函数栈（释放函数所有的变量）
// function test(){
//     const names = ['aaa','bbb']
// }
//第一次调用，调用执行结束后内存就会回收函数内的变量
// test()
//第二次调用，内存会重新创建变量，调用结束后再次回收
// test()