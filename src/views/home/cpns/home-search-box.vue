<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 日期范围 -->
        <div class="section bottom-gray-line">
            <div class="start date-range" @click="showCalender = true">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{startDateStr}}</span>
                </div>
                <div class="stay">共{{stayCount}}晚</div>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{startDateStr}}</span>
                </div>
            </div>
                    <!-- vant日历组件 -->
            <van-calendar v-model:show="showCalender" type="range" @confirm="onConfirm" :show-confirm="false" color="#ff9854" :round="false"/>
        </div>

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        
        <!-- 关键字 -->
        <div class="section bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="section hot-suggests">
            <template v-for="(item,index) in hotSuggests" :key="index">
                <div class="item" :style="{color: item.tagText.color, background: item.tagText.background.color}">
                    {{item.tagText.text}}
                </div>
            </template>
        </div>

        <!-- 开始搜索按钮 -->
        <div class="section search-button">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>



    </div>
</template>

<script setup>
import router from '@/router'
import {computed, reactive, ref} from 'vue'
import useCityStore from '@/stores/modules/city'
import useMainStore from '@/stores/modules/main'
import {storeToRefs} from 'pinia'
import {formatMonthDay, getDiffDays} from '@/utils/format_date.js'

import useHomeStore from '@/stores/modules/home'

// 获取currentCity
const cityStore = useCityStore();
const {currentCity} = storeToRefs(cityStore);

// 进入位置/城市选择页面
const cityClick = () => {
    router.push('./city')
}

const positionClick = () => {
    // 获取当前定位
    console.log(navigator);//本地设备的信息
    navigator.geolocation.getCurrentPosition((res) => {
        console.log('获取位置成功',res);
    }, (err) => {
        console.log('获取位置失败',err);
    }, {
        enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
    })
}

// 日期范围
const showCalender = ref(false);
const mainStore = useMainStore();
const {startDate, endDate} = storeToRefs(mainStore);
const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));
const stayCount = ref(getDiffDays(startDate.value, endDate.value));

const onConfirm = (values) => {
    // 1.设置日期
    const [selectStartDate, selectEndDate] = values;
    mainStore.startDate = selectStartDate;
    mainStore.endDate = selectEndDate;
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    showCalender.value = false;
};

// 热门建议hotSuggest
const homeStore = useHomeStore();
// homeStore.fetchHotSuggestData(); //发起网络请求 放到home.vue里了
const {hotSuggests} = storeToRefs(homeStore);

// 开始搜索按钮
const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}
</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30px;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }
        
        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
        }
    }
}

.date-range {
    height: 44px;
    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color:#666

    }
}
.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}
.hot-suggests {
    margin: 10px 0;
    height: 100%;
    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}
.search-button {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;
    .btn {
        height: 10vw;
        width: 91vw;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>