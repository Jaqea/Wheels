/**
 * 实现数组some方法
 */
function initMySome() {
  Array.prototype.mySome = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }

    const O = Object(this);
    const LEN = O.length >>> 0;
    let k = 0;

    while (k < LEN) {
      if (k in O) {
        if (callback.call(thisArg, O[k], k, O)) {
          return true;
        }
      }
      k++;
    }

    return false;
  };
}
