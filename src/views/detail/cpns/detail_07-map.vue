<template>
    <div class="home">
        <detail-section title="位置周边" more-text="查看更多周边信息" #content>
           <div class="baidu" ref="mapRef"></div>
        </detail-section>
    </div>
</template>
<script setup>
import detailSection from '@/components/detail-section/detail-section.vue'
import {defineProps, onMounted, ref} from 'vue'

const props = defineProps({
    position: {
        type: Object,
        default: () => ({})
    }
});

const mapRef = ref();//获取组件实例
onMounted(() => {
    const map = new BMapGL.Map(mapRef.value); // 创建地图实例 
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标 
    map.centerAndZoom(point, 15); // 初始化地图，设置了地图的中心点和缩放级别
    const marker = new BMapGL.Marker(point);  //创建了一个地图标记 marker
    map.addOverlay(marker);// 在地图上添加标记
})
</script>

<style lang="less" scoped>
.baidu {
  height: 250px;
}

</style>