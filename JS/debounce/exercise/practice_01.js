/**
 * 防抖
 * @param fn - 需要进行防抖的函数
 * @param waitTime - 延迟执行时间
 * @param immediate - 是否立即执行
 */
function debounce(fn, waitTime, immediate) {
  let result, timerId;

  const debounced = function () {
    if (timerId) {
      clearTimeout(timerId);
    }

    const context = this;
    const args = arguments;
    if (immediate) {
      const isCallNow = !timerId;
      timerId = setTimeout(function () {
        timerId = null;
      }, waitTime);
      if (isCallNow) {
        result = fn.apply(context, args);
      }
    } else {
      timerId = setTimeout(function () {
        fn.apply(context, args);
      }, waitTime);
    }

    return result;
  };

  return debounced;
}
