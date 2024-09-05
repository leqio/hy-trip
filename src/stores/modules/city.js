import {defineStore} from 'pinia'
// city网络请求
import { getCityAll } from '@/services'


const useCityStore = defineStore('city',{
    state: () => ({
        allCities: {},
        currentCity:{
            cityName: '广州',
        }
    }),
    getters: {

    },
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll();
            this.allCities = res.data
            console.log(res.data);
        }
    }
})

export default useCityStore