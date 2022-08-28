<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        components: {},
        props: {
            path: String,
            activeColor: {
                type: String,
                default: 'palevioletred'
            }
        },
        data() {
            return {
                 // isActive: true
            };
        },
        watch: {},
        computed: {
            isActive() {
                // console.log(this.$route.path);
                // console.log('------------------------')
                // console.log(this.path);
                // console.log('------------------------------------------------------')
                // console.log('efdfr/homefdsf'.indexOf(this.path));
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}
            }
        },
        methods: {
            itemClick() {
                // console.log('itemClick');
              // console.log(this.path);

                this.$router.replace(this.path)
            }
        },
        created() { },
        mounted() { }
    };
</script>

<style>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
    }

    .tab-bar-item img {
        margin-top: 5px;
        width: 24px;
        height: 24px;
    }

    .tab-bar-item p {
        font-size: 12px;
        line-height: 12px;
    }

    /* .active {
        color: palevioletred;
    } */
</style>