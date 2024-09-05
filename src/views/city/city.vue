<template>
    <div class="city top-page">
        <div class="top">
            <!-- 1.搜索框vant组件 -->
            <van-search v-model="searchValue" 
            placeholder="城市/区域/位置" 
            shape="round"
            show-action
            @search="searchClick"
            @cancel="canelClick"/>
            <!-- <template #left-icon>
                <img src="@/assets/img/search/home-sprite.png" alt="">
            </template> -->

            <!-- 2.tab的切换vant组件 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value,key,index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        
        <div class="content">
            <template v-for="(value,key,index) in allCities" :key="index">
                <city-group v-show="tabActive === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
// city网络请求
// import { getCityAll } from '@/services'
import useCityStore from '@/stores/modules/city'
import {storeToRefs} from 'pinia'
import CityGroup from './cpns/city-group.vue'

const router = useRouter()
// 1.搜索框功能
const searchValue = ref('');
const searchClick = (val) => showToast(val);
const canelClick = () => {
    router.back();//返回上一级
};

// 2.tab切换
const tabActive = ref(0);
/** 
 * 在这个位置发起网络请求缺点：
 * 1.若网络请求太多，页面组件中包含大量对于网络请求和数据的处理逻辑，拉低网络请求速度
 * 2.若页面分装了很多子组件，子组件需要这些数据时，我们必须一步步传值
 *  const allCities = ref();
    getCityAll().then(res => {
        console.log('res--',res);
    })
    
    所以我们一般从store获取数据,将网络请求放到store中
*/
// 从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData() //发起网络请求
const {allCities} = storeToRefs(cityStore) //解构cityStore

</script>

<style lang="less" scoped>
.top {
    position: relative;
    z-index: 9;
}
.content {
    height: calc(100vh - 98px);
    overflow-y: auto;
}
</style>