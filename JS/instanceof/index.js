/**
 * 实现instanceof
 * @param leftValue - instanceof左侧对象
 * @param rightValue - instanceof右侧对象
 */
function myInstanceof(leftValue, rightValue) {
  if (leftValue === null || typeof leftValue !== "object") {
    return false;
  }

  const rightProto = rightValue.prototype;
  let letfProto = leftValue.__proto__;
  while (letfProto) {
    if (letfProto === rightProto) {
      return true;
    }
    letfProto = letfProto.__proto__;
  }

  return false;
}
