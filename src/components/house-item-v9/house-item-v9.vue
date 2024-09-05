<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData?.image?.url" alt="">
            </div>
            <div class="info">
                <div class="summary">{{itemData?.summaryText}}</div>
                <div class="name">{{itemData?.houseName}}</div>
                <div class="price">
                    <!-- <van-rate v-model="itemScore" color="#fff" :size="15" readonly allow-half :count="5"/> -->
                    <van-rate :model-value="itemScore" color="#fff" :size="15" readonly allow-half ></van-rate>
                    <div class="new">￥{{itemData?.finalPrice}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {defineProps,computed, ref} from 'vue'

const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})

const itemScore = computed(() => {
	return Number(props.itemData.commentScore)
})

</script>

<style lang="less" scoped>
.house-item {
    width: 50%;

    .item-inner {
        position: relative;
        margin: 5px;
        border-radius: 6px;
        overflow: hidden;

        .cover {
            img {
                width: 100%;
            }
        }
    }
}

.info {
    position: absolute; // .info 元素会脱离正常的文档流，不再占据其原始位置的空间。
    bottom: 0; //将info的底部与已定位的祖先元素.item-inner的底部对齐
    padding: 8px 10px;
    color: #fff;

    .summary {
        font-size: 12px;
    }

    .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; // 根据内容进行弹性收缩,便于和下面两个属性配合
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .price {
        display: flex;
        // flex-wrap: wrap; //允许flex容器内的子元素在需要时换行到下一行，而不是缩小或溢出容器
        justify-content: space-between; //用于在flex容器的主轴上（默认是水平方向）分布子元素
		margin-top: 10px;
    }
}
</style>