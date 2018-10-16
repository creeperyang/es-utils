/**
 * throttle 函数节流
 * 
 * throttle 不允许方法在每 wait ms 间执行超过一次，即在频繁的函数调用时，降低函数执行频次。
 * 
 * @description Create and return a new, throttled version of the passed
 * function, that, when invoked repeatedly, will only actually call the original
 * function at most once per every wait milliseconds.
 * 
 * @param {Function} fn The original function to be called
 * @param {Number} wait Time to wait, in milliseconds
 */
export default function throttle(fn, wait) {
    const ms = +wait || 0;
    let timer = null;
    let lastCalledTime = null; // 第一次调用或者上一次执行的时间点

    return function throttled(...args) {
        const now = Date.now();
        let needExecNow = false;
        let delta = 0;
        if (lastCalledTime !== null) {
            // 距离上次执行的时间
            delta = now - lastCalledTime;
            if (delta >= ms) {
                needExecNow = true;
            }
        } else {
            // （1）如果 throttled 被第一次调用，设置 lastCalledTime 为 now；
            lastCalledTime = now;
        }
        if (timer !== null) {
            clearTimeout(timer);
        }
        // 如果立即执行
        if (needExecNow) {
            fn(...args);
            // （2）其它情况下，只有 fn 执行后才更新 lastCalledTime。
            lastCalledTime = now;
        } else {
            // 如果不用立即执行，设置 timer 保证在 ms 内，fn 必然执行一次。
            timer = setTimeout(() => {
                fn(...args);
                // 如果是 timer 触发而执行，则更新 lastCalledTime 为执行时的时间，
                // 从而防止下一次 needExecNow 计算错误。
                lastCalledTime = Date.now();
            }, ms - delta);
        }
    }
}