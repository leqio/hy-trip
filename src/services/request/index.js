// axios的简易封装
import axios from "axios";
import {BASE_URL, TIMEOUT} from './config.js';
import useMainStore from "@/stores/modules/main.js";

const mainStore = useMainStore();

class DLRequest {
    constructor(baseURL, timeout=10000) {
        this.instance = axios.create({
            baseURL,
            timeout
        });
        // 请求拦截
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading = true;
            return config;
        },err => {
            return err;
        });
        // 响应拦截
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading = false;
            return res;
        },err => {
            mainStore.isLoading = false;
            return err;
        })
    }

    
    request(config) {
        // mainStore.isLoading = true;
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                resolve(res.data);
                // 请求成功
                // mainStore.isLoading = false;
            }).catch(err => {
                reject(err);
                // 请求失败
                // mainStore.isLoading = false;
            }) 
        });
    }

    get(config) {
        return this.request({
            ...config,
            methods: 'get'
        })
    }

    post(config) {
        return this.request({
            ...config,
            methods: 'post'
        })
    }

}

export default new DLRequest(BASE_URL, TIMEOUT);
