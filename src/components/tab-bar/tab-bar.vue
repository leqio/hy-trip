<template>
    <div class="tab-bar">
        <!-- 直接使用vant组件，不用手动导入 -->
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <!-- <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
            <template v-for="(item, index) in tabbarData" :key="item.path">
                <!-- :to 属性实际上是 Vant 的 van-tabbar-item 组件内部用于处理路由跳转的一个属性，
                不是 Vue Router 的 router-link 组件的属性 -->
                <van-tabbar-item :to="item.path">
                    <template #default>
                        <span>{{item.text}}</span>
                    </template>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>

    </div>
</template>

<script setup>
import {ref} from 'vue'
import tabbarData from '@/assets/data/tabbar.js'
import getAssetURL from '@/utils/load_assets.js'
const currentIndex = ref(0);

</script>

<style lang="less" scoped>
.tab-bar {
    font-size: 30px;
    
    // 局部样式：只针对tab-bar子元素才生效,对子组件不生效
    // .van-tabbar-item__icon {
    // font-size: 50px;
    // }

    // 要想生效，需要找到子组件的类，对类中的css属性重写
    // 使用 :deep(.class) 伪类选择器可以穿透组件样式封装，使得样式可以应用到子组件上。
    :deep(.van-tabbar-item__icon) {
        font-size: 50px;
    }
}
</style>