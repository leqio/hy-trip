import {getHomeHotSuggests, getHomeCategories, getHomeHouseList} from '@/services'
import {defineStore} from 'pinia'

const useHomeStore = defineStore('home',{
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests();
            console.log('热门建议--',res.data);
            this.hotSuggests = res.data
            // console.log(this.hotSuggests);
        },
        async fetchHomeCategoriesData() {
            const res = await getHomeCategories();
            console.log('菜单--',res.data);
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHomeHouseList(this.currentPage);
            console.log('fetchHouseListData---',this.currentPage);
            // console.log('房屋信息--',res.data);
            this.houselist.push(...res.data);//展开数组，将每一个元素添加到houselist
            // console.log('housetlist--',this.houselist);
            this.currentPage ++;
        }
    }
})

export default useHomeStore