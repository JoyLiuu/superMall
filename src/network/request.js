import axios from 'axios'

export function request(config) {
    //1.创建axios实例1
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        //超时时间
        timeout: 5000
        //    默认get请求，如果指定其他请求更改method如：
        //method:'post'
    })

    //2.axios的拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(config => {
        // console.log('来到了request拦截(interceptors)success中')
        //拦截的使用实际场景=》请求来的config内有的信息需要过滤可以在这里先筛选后再将结果返回
        //1.比如config中一些信息不符合服务器要求
        //2.比如每次发送网络请求时，希望在界面中显示一个请求的图标
        //3.某些网络请求如token，必须携带一些特殊信息
        return config
    }, err => {
        // console.log('request拦截失败')
        console.log(err);
    })
    //2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log('response拦截成功')
        return res.data  //过滤掉axios自动添加的一些属性只留data的信息
    }, err => {
        // console.log('response拦截失败')
        console.log(err);
    })
    //3.发送真正的网络请求
    return instance(config)
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

//源码：flow语法  有时间学习一下



//axios默认是用get请求,all方法可以发送并发请求
// axios.all([axios({
//     url:
// }),axios({
//     url:
//     params:{
//         type:
//         page:
// }
// })]).then(results => { console.log(results)})  //返回的是两个结果组成的数组，如果要拆开展示则是用spread：
// .then(axios.spread((res1,res2)=>{
//     console.log(res1);
//     console.log(res2)
// }))
