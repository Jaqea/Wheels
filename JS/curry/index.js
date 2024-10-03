/**
 * 函数柯里化
 * @param fn - 进行柯里化的函数
 */
function curry(fn, ...args) {
  return fn.length > args.length
    ? (...arguments) => curry(fn, ...args, ...arguments)
    : fn.apply(this, args);
}
