import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

// export const useScroll = () => {
//         const clientHeight = document.documentElement.clientHeight; //可视区高度
//         const scrollTop = document.documentElement.scrollTop; //滚动条到页面顶部高度
//         const scrollHeight = document.documentElement.scrollHeight; //整个文档的高度，包括用户可能需要滚动才能看到的内容。
//         console.log(clientHeight,scrollTop,clientHeight+scrollTop,scrollHeight);

//         if (clientHeight + scrollTop +1 >= scrollHeight) {
//             console.log(clientHeight,scrollTop,scrollHeight);
//             console.log('滚动条到底了');
//         };
// }



// export const useScroll = () => {
    
//     const scrollListenerHandlers = () => {
//         const clientHeight = document.documentElement.clientHeight; //现有页面高度
//         const scrollTop = document.documentElement.scrollTop; //滚动条到页面顶部高度
//         const scrollHeight = document.documentElement.scrollHeight; //滚动条高度

//         if (clientHeight + scrollTop +1 >= scrollHeight) {
//             console.log(clientHeight,scrollTop,scrollHeight);
//             console.log('滚动条到底了');
//         };
//     }

//     onMounted(() => {
//         window.addEventListener('scroll',scrollListenerHandlers)
//     });
//     onUnmounted(() => {
//         window.removeEventListener('scroll',scrollListenerHandlers)
//     })
// }

// ****
// export const useScroll = () => {
//     const isReachBottom = ref(false);
//     const clientHeight = ref(0);
//     const scrollTop = ref(0);
//     const scrollHeight = ref(0);

//     // 防抖：多次触发只执行最后一次throttle()
//     const scrollListenerHandlers = throttle(() => {
        
//         clientHeight.value = document.documentElement.clientHeight; //当前页面高度
//         scrollTop.value = document.documentElement.scrollTop; //滚动条到页面顶部高度
//         scrollHeight.value = document.documentElement.scrollHeight; //滚动条高度
    
//         // console.log(clientHeight.value,scrollTop.value,scrollHeight.value);

//         if (scrollTop.value + clientHeight.value +1 >= scrollHeight.value) {
//             console.log('滚动条到底了');
//             isReachBottom.value = true;
//         };
//     });

//     onMounted(() => {
//         window.addEventListener('scroll',scrollListenerHandlers);
//     });
//     onUnmounted(() => {
//         window.removeEventListener('scroll',scrollListenerHandlers)
//     });

//     return {isReachBottom, clientHeight, scrollTop, scrollHeight};
// }
//*** */

export const useScroll = (elRef) => {
    let el = window;
    // 滚动条是否触底
    const isReachBottom = ref(false);
    // 当前页面高度
    const clientHeight = ref(0);
    // 滚动条到页面顶部高度
    const scrollTop = ref(0);
    //滚动条高度
    const scrollHeight = ref(0);

    // 防抖：多次触发只执行最后一次throttle()
    const scrollListenerHandlers = throttle(() => {
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight; //当前页面高度
            scrollTop.value = document.documentElement.scrollTop; //滚动条到页面顶部高度
            scrollHeight.value = document.documentElement.scrollHeight; //滚动条滚动范围高度
        } else {
            clientHeight.value = el.clientHeight; //现有页面高度
            scrollTop.value = el.scrollTop; //滚动条到页面顶部高度
            scrollHeight.value = el.scrollHeight; //滚动条范围高度
        };
        // console.log(clientHeight.value,scrollTop.value,scrollHeight.value);

        if (scrollTop.value + clientHeight.value +1 >= scrollHeight.value) {
            console.log('滚动条到底了');
            isReachBottom.value = true;
        };
    });

    onMounted(() => {
        if(elRef) el = elRef.value;
        el.addEventListener('scroll',scrollListenerHandlers);
        // console.log('el--', el);
    });
    onUnmounted(() => {
        el.removeEventListener('scroll',scrollListenerHandlers)
    });

    return {isReachBottom, clientHeight, scrollTop, scrollHeight};
}



