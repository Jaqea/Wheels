/**
 * 数组扁平化
 * @param arr - 需要扁平化的数组
 * @param deep - 扁平化层数, 默认取值为 1
 */
function flatten(arr, deep = 1) {
  return deep
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? flatten(cur, deep - 1) : cur),
        []
      )
    : arr.slice();
}
