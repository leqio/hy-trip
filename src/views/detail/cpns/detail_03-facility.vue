<template>
    <div class="facility">
        <detail-section title="房屋设施" more-text="查看全部设施" #content>
            <!-- 在组件标签之间插入自定义的内容，这些内容将替换掉对应的插槽。 -->
            <div class="facility-inner">
                <template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
                    <div class="item" v-if="houseFacility.facilitySort?.includes(index)">
                        <div class="head">
                            <img :src="item.icon" alt="">
                            <div class="text">{{item.groupName}}</div>
                        </div>
                        <div class="list">
                            <template v-for="(item1, index1) in item.facilitys.slice(0,4)" :key="index1">
                                <div class="item1">
                                    <i class="icon_check icon"></i>
                                    <span class="text">{{item1.name}}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </detail-section>
    </div>
</template>
<script setup>
import detailSection from '@/components/detail-section/detail-section.vue'
import {defineProps} from 'vue'

const props = defineProps({
    houseFacility: {
        type: Object,
        default: () => ({})
    },
})
</script>

<style lang="less" scoped>
.facility-inner {
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #f7f9fb;

    .item {
        display: flex;
        margin: 25px 0 ;

        .head {
            width: 90px;
            text-align: center;

            img {
                width: 20px;
                height: 20px;
            }

            .text {
                margin-top: 5px;
                color: #000;
            }
        }

        .list {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            
            .item1 {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 50%;
                margin: 4px 0;

                .icon {
                    margin: 0 6px;
                    font-size: 12px;
                }

                .text {
                    color: #333;
                }

                
            }
        }
    }
}
</style>