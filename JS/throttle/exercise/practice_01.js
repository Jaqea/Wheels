/**
 * 节流
 * @param fn - 需要进行节流的函数
 * @param waitTime - 执行时间间隔
 */
function throttle(fn, waitTime) {
  let timerId, context, args;

  const throttled = function () {
    if (!timerId) {
      context = this;
      args = arguments;
      timerId = setTimeout(function () {
        fn.apply(context, args);
        timerId = null;
        context = args = null;
      }, waitTime);
    }
  };

  return throttled;
}
