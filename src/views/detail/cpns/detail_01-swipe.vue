<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
        <template v-for="(item, index) in swipeData" :key="index">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
        </template>

        <template #indicator="{ active, total }">
            <!-- <div class="indicator">{{ active }}/{{ swipeData.length }}-{{ total }}</div> -->
            <div class="indicator">
                <template v-for="(value, key, index) in swipeGroup" :key="key">
                    <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                        <span class="text">{{ getName(value[0].title) }}</span>
                        <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                            {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                        </span>
                    </span>
                </template>
            </div>
        </template>
    </van-swipe>
  </div>
</template>
<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
});
// 数据转换，enumPictureCategory: 2-卧室，4-卫生间，9-其他
const swipeGroup = {};
for (const item of props.swipeData) {
    // 方括号 [] 来访问对象的属性是一种动态的方式，它允许你使用一个变量或表达式的结果作为属性名
    // 浅拷贝--引用赋值，改变valueArray就是改变swipeGroup[item.enumPictureCategory]
    let valueArray = swipeGroup[item.enumPictureCategory];
    if (!valueArray) {
        valueArray = [];
        swipeGroup[item.enumPictureCategory] = valueArray; //swipeGroup添加属性和值[]
    };
    valueArray.push(item); //把enumPictureCategory相同的放到一个数组valueArray
    // console.log('swipeGroup--',swipeGroup);
    // console.log('valueArray--',valueArray);
};

// 定义转换数据的方法
const nameReg = /【(.*?)】/i  //没有g会返回第一个匹配数据及其具体其他信息
const getName = (name) => {
    // const results = nameReg.exec(name)
    const results = name.match(nameReg);
    // console.log(name);
    // console.log(results);
    return results[1];
};
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item) + 1
};


</script>

<style lang="less" scoped>
.swipe {

    .swipe-list {
        position: relative;

        .item {
            img {
                width: 100%;
            }
        }

        .indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: flex;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, .8);

            .item {
                margin: 0 3px;
                &.active {
                    padding: 0 3px;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #333;
                }
            }
        }
    }
}



</style>