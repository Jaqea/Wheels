/**
 * 深拷贝
 * @param obj - 需要深拷贝的对象, 类型可为原始值、数组、对象、Map
 */
function deepClone(obj) {
  const map = new Map();

  function clone(target) {
    if (map.has(target)) {
      return map.get(target);
    }

    const type = Object.prototype.toString
      .call(target)
      .replace(/\[object (\w+)\]/, "$1");

    const strategy = {
      ObjectorArray() {
        const cloneTarget = new target.constructor();
        map.set(target, cloneTarget);
        for (const [k, v] of Object.entries(target)) {
          cloneTarget[k] = clone(v);
        }
        return cloneTarget;
      },
      map() {
        const cloneTarget = new Map();
        for (const [k, v] of target) {
          cloneTarget.set(clone(k), clone(v));
        }
        return cloneTarget;
      },
      // 其它类型...
    };

    if (["Object", "Array"].includes(type)) {
      return strategy["ObjectorArray"]();
    } else {
      return strategy[type] ? strategy[type]() : target;
    }
  }

  return clone(obj);
}
