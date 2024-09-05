import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            name: 'home',
            path: '/home',
            component: () => import('@/views/home/home.vue')
        },
        {
            name: 'favor',
            path: '/favor',
            component: () => import('@/views/favor/favor.vue')
        },
        {
            name: 'order',
            path: '/order',
            component: () => import('@/views/order/order.vue')
        },
        {
            name: 'message',
            path: '/message',
            component: () => import('@/views/message/message.vue')
        },
        {
            name: 'city',
            path: '/city',
            component: () => import('@/views/city/city.vue')
        },
        {
            name: 'search',
            path: '/search',
            component: () => import('@/views/search/search.vue'),
            meta: {
                hideTabBar: true
            }
        },
        {
            name: 'detail',
            path: '/detail/:id',
            component: () => import('@/views/detail/detail.vue'),
            meta: {
                hideTabBar: true
            }
        },
    ]
})

export default router