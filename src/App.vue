<template>
    <div class="app">
        <!-- <router-view></router-view>
        <tab-bar></tab-bar> -->

         <!-- 插槽传参：props变量接收router-view传出的route的props信息 -->
        <router-view v-slot="props">
            <keep-alive include="home">
                <component :is="props.Component"></component>
            </keep-alive>
        </router-view>

        <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
        <loading></loading>
    </div>
</template>

<style scoped>

</style>

<script setup> 
// 引入组件
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading.vue'

import {useRoute} from 'vue-router'
const route = useRoute();

</script>