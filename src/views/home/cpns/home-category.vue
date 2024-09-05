<template>
    <div class="categories">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{item.title}}</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import useHomeStore from '@/stores/modules/home'

const homeStore = useHomeStore();
const {categories} = storeToRefs(homeStore);

</script>

<style lang="less" scoped>
.categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    padding: 0px 10px;
    margin-top: 8px;
    // ::-webkit-scrollbar这是一个针对 WebKit 浏览器（如 Chrome 和 Safari）的伪元素选择器，用于隐藏 .categories 的滚动条
    // & 的作用是,告诉less在转换时,不要用后代来转换,直接拼接在当前选择器的后面即可
    &::-webkit-scrollbar {
        display: none;
    }
    .item {
        flex-shrink: 0;
        display: flex;
        flex-direction: column; //子项垂直排列
        align-items: center;//子项沿交叉轴（横轴）居中--水平对齐
        justify-content: center; //子项沿主轴（纵轴）居中--竖向对齐
        width: 70px;
        text-align: center;

        img {
            width: 32px;
            height: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 8px;
        }
    }
}

</style>