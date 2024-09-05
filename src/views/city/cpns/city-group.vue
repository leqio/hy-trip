<template>
    <div class="city-group">
        <!--vant IndexBar 索引栏组件 -->
        <van-index-bar :sticky="false" :index-list="indexList" highlight-color="#ff9854">
            <!-- 热门城市 -->
            <van-index-anchor index="热门"></van-index-anchor>
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities" :key="index">
                    <div class="city" @click="cityClick(city)">{{city.cityName}}</div>
                </template>
            </div>
             <!-- 全部城市 -->
            
            <div class="group">
                <template v-for="(group, index) in groupData.cities" :key="index">
                    <!-- 索引 -->
                    <van-index-anchor :index="group.group"></van-index-anchor>
                    <!-- 内容 -->
                    <template v-for="(city,index) in group.cities" :key="index">
                        <van-cell :title="city.cityName" @click="cityClick(city)"/>
                    </template>
                </template>
            </div>  
        </van-index-bar>

       
        
    </div>
</template>
<script setup>
import { computed } from 'vue';
import {useRouter} from 'vue-router';
import useCityStore from '@/stores/modules/city';

// 定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => {}
    }
})

// 动态索引
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group);
    // console.log('list--',list);
    list.unshift('#');
    return list;
})

// 城市监听处理
const router = useRouter();
const cityStore = useCityStore();
const cityClick = (city) => {
    // 选中当前城市
    cityStore.currentCity = city;

    router.back();
}

</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-right: 25px;
    color: #000;
    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;;
        margin: 6px
    }
}
</style>