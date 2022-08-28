import {debounce} from "@/components/common/utils";
export const itemListenerMixin = {
    data(){
        return {
            //全局监听图片加载事件
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted(){
        //this.$refs.scroll.refresh对这个函数进行防抖操作
        this.newRefresh = debounce(this.$refs.scroll.refresh, 50);

        this.itemImgListener = ()=>{
            this.newRefresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
        // console.log('我是mixin中的内容')
    }
}