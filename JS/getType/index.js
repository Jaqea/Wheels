/**
 * 判断数据类型
 * @param target - 需要进行类型判断的数据
 */
function getType(target) {
  if (target === null) {
    return `${target}`;
  }

  if (typeof target === "object") {
    const typeStr = Object.prototype.toString.call(target);
    const typeArr = typeStr.split(" ")[1].split("");
    typeArr.pop();

    return typeArr.join("");
  }

  return typeof target;
}
