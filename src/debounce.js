/**
 * debounce 函数防抖
 * 
 * deboucne 可以将连续的调用归为一个，即在阀值之前，每次调用都会重置等待期。用于比如
 * autocomplete 组件，在连续输入期间（两次输入间隔小于阀值）不去请求服务器，降低服务器压力。
 * 
 * @description Create and return a new debounced version of the passed function
 * which will postpone its execution until after wait milliseconds have elapsed
 * since the last time it was invoked.
 * 
 * @param {Function} fn The original function to be called
 * @param {Number} wait Time to wait, in milliseconds
 */
export default function debounce(fn, wait) {
    const ms = +wait || 0;
    let timer = null;

    return function debounced(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, ms, ...args);
    }
}
