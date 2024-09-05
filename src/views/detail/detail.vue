<template>
    <div class="detail top-page" ref="detailRef">
        <!-- 页面详情的tab -->
        <tab-control v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" ref="tabControlRef"></tab-control>

        <!-- 导航栏 -->
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft"/>

        <!-- 主要内容 -->
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
            <detail-infos name="描述" :ref="getSectionRefs" :top-infos="mainPart.topModule"></detail-infos>
            <detail-facility name="设施" :ref="getSectionRefs" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
            <detail-landlord name="房东" :ref="getSectionRefs" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
            <detail-comment name="评论" :ref="getSectionRefs" :comment="mainPart.dynamicModule.commentModule"></detail-comment>
            <detail-notices name="须知" :ref="getSectionRefs" :order-rules="mainPart.dynamicModule.rulesModule"></detail-notices>
            <detail-map name="周边" :ref="getSectionRefs" :position="mainPart.dynamicModule.positionModule"></detail-map>
            <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">弘源旅途, 永无止境!</div>
        </div>

    </div>
</template>
<script setup>
import tabControl from '@/components/tab-control/tab-control.vue'
import {computed, onMounted, onUpdated, ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {getDetailInfos} from '@/services'
import {useScroll} from '@/hooks/useScroll.js'

import detailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import detailFacility from './cpns/detail_03-facility.vue'
import detailLandlord from './cpns/detail_04-landlord.vue'
import detailComment from './cpns/detail_05-comment.vue'
import detailNotices from './cpns/detail_06-notices.vue'
import detailMap from './cpns/detail_07-map.vue'
import detailIntro from './cpns/detail_08-intro.vue'

const router = useRouter();
const onClickLeft = () => router.back();



// tabControl隐藏/显示
const detailRef = ref();//获取组件实例
const {scrollTop} = useScroll(detailRef);
// const showTabControl = ref(true);
const showTabControl = computed(() => {
    if(scrollTop.value > 300) return true;
});

// 传递names
const sectionEls = ref({});
const names = computed(() => Object.keys(sectionEls.value));
    // :ref="getSectionRefs" 是一种动态引用（ref）的绑定方式。
    // 这里的 getSectionRefs 函数被用作一个工厂函数，用于生成每个组件的引用。
    // 当 Vue 渲染这些组件时，它会调用 getSectionRefs 函数，并将组件实例作为参数 value 传递进去。
const getSectionRefs = (value) => {
    if(!value) return;
    const name = value.$el.getAttribute('name');
    // console.log('value--', name);
    sectionEls.value[name] = value.$el;
    // console.log(value.$el);//组件下的第一个节点
};

//点击tabControl,页面滚动到对应组件
let isClick = false;
let currentDistance = -1;
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index];
    const el = sectionEls.value[key];
    let distance = el.offsetTop;//元素的顶部偏移量，px

    if(index !== 0) {
        distance = distance - 44; //44为tabControl高度
    };

    isClick = true;
    currentDistance = distance;
    //滚动
    detailRef.value.scrollTo({
        top: distance,
        behavior: 'smooth'
    })
};


// 根据滚动设置tabControl
const tabControlRef = ref();
watch(scrollTop, (newValue) => {
    if(newValue === currentDistance) {
        isClick = false;
    };
    if (isClick) return;

    // 1.获取所有区域的offsetTops
    const els = Object.values(sectionEls.value);
    // console.log('els--',els);
    const values = els.map(el => el.offsetTop);
    // console.log('values', values);

    // 2.根据newValue匹配
    let index = values.length -1;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i;
            break;
        }
    };
    // console.log('11',tabControlRef.value);
    tabControlRef.value?.setCurrentIndex(index); //第一次监听tabControlRef.value是undefined,当滚轮滚动再次被监听到tabControlRef.value被加载了，可以调用方法
});


//mianPart数据的网络请求
const route = useRoute();
const houseId = route.params.id;
    // 发送网络请求
const detailInfos = ref({});
const mainPart = computed(() => {return detailInfos.value.mainPart});
console.log('mainPart--', mainPart);
getDetailInfos(houseId).then(res => {
    detailInfos.value = res.data;
    // console.log('swipeData--', res.data.mainPart.topModule.housePicture.housePics);
});


</script>
<style lang="less" scoped>

.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>