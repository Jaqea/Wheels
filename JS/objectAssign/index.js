/**
 * 实现Object.assign (浅拷贝)
 * @param target - 目标对象
 * @param sources - 源对象
 */
function myAssign(target, ...sources) {
  if (target == null) {
    throw new TypeError("target is null or not defined");
  }

  if (typeof target !== "object") {
    target = Object(target);
  }

  sources.forEach((source) => {
    if (typeof source === "object" && source !== null) {
      for (const [key, value] of Object.entries(source)) {
        target[key] = value;
      }
    }
  });

  return target;
}
