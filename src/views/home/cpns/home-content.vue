<template>
	<div class="content">
		<h2 class="title">热门精选</h2>
		<div class="list">
            <!-- <button @click="btnClick">按钮</button> -->
			<template v-for="(item, index) in houselist" :key="item.data?.houseId">
				<house-item-v3 v-if="item.discoveryContentType == 3" 
				:item-data="item.data" 
				@click="itemClick(item.data)"
				></house-item-v3>
				<house-item-v9 v-else-if="item.discoveryContentType == 9" 
				:item-data="item.data" 
				@click="itemClick(item.data)"
				></house-item-v9>
			</template>
		</div>
	</div>
</template>
<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import {useRouter} from 'vue-router'

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

// const btnClick = () => {
//     console.log(houselist.value);
// }

const router = useRouter()
const itemClick = (item) => {
	// 跳转到详情页面
	router.push('/detail/' + item.houseId)
}
</script>

<style lang="less" scoped>
.content {
	padding: 10px 8px;

	.title {
		font-size: 22px;
		padding: 10px;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>