function shallowClone(target) {
  if (target === null || typeof target !== "object") {
    return target;
  }

  const cloneTarget = {};

  for (const [key, value] of Object.entries(target)) {
    cloneTarget[key] = value;
  }

  return cloneTarget;
}
