<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url" alt="">
            </div>
            <div class="info">
                <div class="location">
                    <img src="@/assets/img/home/location.png" alt="">
                    <div class="text">{{itemData.location}}</div>
                </div>
                <div class="name">{{itemData.houseName}}</div>
                <div class="summary">{{itemData.summaryText}}</div>
                <div class="price">
                    <div class="new">￥{{itemData.finalPrice}}</div>
                    <div class="old">￥{{itemData.productPrice}}</div>
                    <div class="tip" v-if="itemData.priceTipBadge">{{itemData.priceTipBadge.text}}</div>
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
        background-color: #fff;
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
    position: relative; 
    bottom: 0; 
    padding: 8px 10px;
    color: #666;

    .location {
        display: flex;
        align-items: center;     

        img {
            width: 12px;
            height: 12px;
        }

        .text {
            margin-left: 2px;
            font-size: 12px;
            color: #666;
        }
    }

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
        align-items: flex-start;
        margin: 8px 0;

        .new {
            color: #ff9645;
            font-size: 14px;
        }
        
        .old {
            margin: 0 3px;
            color:#999;
            font-size: 12px;
            text-decoration: line-through;
        }

        .tip {
            background: linear-gradient(270deg, #f66, #ff9f9f);//渐变色
            color: #fff;
            padding: 0 6px;
            border-radius: 6px;
        }
        
    }
}
</style>