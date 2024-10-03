/**
 * 偏函数 (将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入)
 */
function partial(fn, ...args) {
  return (...arguments) => fn(...args, ...arguments);
}
