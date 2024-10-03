/**
 * 判断对象类型函数
 * @param type - 判断的类型
 */
function determinObjectType(type) {
  return (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`;
}
