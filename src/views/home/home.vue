<template>
    <div class="home" ref="homeRef">
        <!-- 标题 -->
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <!-- 搜索 -->
        <home-search-box></home-search-box>
        <!-- 菜单 -->
        <home-category></home-category>
        <!-- 内容 -->
        <home-content></home-content>
        <!-- 住/离搜索栏 -->
        <search-bar class="search-bar" v-if="isShowSearchBar"></search-bar>

    </div>
</template>
<script setup>
import {computed, onActivated, ref, watch} from 'vue'
import homeNavBar from './cpns/home-nav-bar.vue'
import homeSearchBox from './cpns/home-search-box.vue'
import homeCategory from './cpns/home-category.vue'
import homeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/search-bar.vue'

import useHomeStore from '@/stores/modules/home'

import {useScroll} from '@/hooks/useScroll.js'

//发起网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSuggestData(); 
homeStore.fetchHomeCategoriesData(); 
homeStore.fetchHouseListData(); 

// 监听滚动到底部
const {isReachBottom, scrollTop} = useScroll();
watch(isReachBottom, (newValue) => {
    if(newValue) {
        homeStore.fetchHouseListData().then(() => {
            isReachBottom.value = false;
        })
    };
});

// 搜索框显示规则
// 方式一：监听滚动条
// const isShowSearchBar = ref(false);
// watch(scrollTop, (newValue) => {
//     if (newValue > 300) {
//         isShowSearchBar.value = true;
//     } else {
//         isShowSearchBar.value = false;
//     }
// });
// 方式二：定义一个响应式数据,依赖另外一个可响应式的数据，可使用computed计算属性
const isShowSearchBar = computed(() => {
    if (scrollTop.value >= 320) return true
});


// 跳转回home时，保留原来的位置
const homeRef = ref(); //获取组件实例
onActivated(() => {
    homeRef.value.scrollTo({
        top: scrollTop.value
    })
});


</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    padding-bottom: 60px;
    box-sizing: border-box;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed; //脱离文档流，基于浏览器视口的位置，前提是父元素.home没有设置overflow，不然就是基于.home位置
    top: 0px; //距浏览器顶部0px
    z-index: 9;
    left: 0px;
    right: 0px;
    background-color: #fff;
    height: 45px;
    padding: 16px 16px 16px 10px;
}
</style>