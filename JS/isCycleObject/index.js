/**
 * 判断对象是否存在循环引用
 * @param target - 需要判断的对象
 */
function isCycleObject(target) {
  const map = new Map();
  let flag = false;

  const isCycle = function (obj) {
    if (obj !== null || typeof obj === "object") {
      if (map.has(obj)) {
        flag = true;
        return;
      } else {
        map.set(obj, 1);
        for (const value of Object.values(obj)) {
          isCycle(value);
          if (flag) {
            return;
          }
        }
      }
    }
  };

  isCycle(target);
  return flag;
}
