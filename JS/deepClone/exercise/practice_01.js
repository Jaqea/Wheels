/**
 * 深拷贝
 * @param target - 要进行深拷贝的对象
 */
function deepClone(target) {
  const map = new Map();

  const clone = function (obj) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }

    if (obj instanceof Date) {
      return new Date(obj);
    }

    if (map.has(obj)) {
      return map.get(obj);
    }

    const cloneObj = new obj.constructor();
    map.set(obj, cloneObj);
    for (const [key, value] of Object.entries(obj)) {
      cloneObj[key] = clone(value);
    }

    return cloneObj;
  };

  return clone(target);
}
