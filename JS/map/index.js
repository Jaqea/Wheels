/**
 * 实现数组map方法
 */
function initMyMap() {
  Array.prototype.myMap = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    if (typeof callback !== "function") {
      throw new TypeError(`${callback} is not a function`);
    }

    const O = Object(this);
    const LEN = O.length >>> 0;
    const res = [];
    let k = 0;

    while (k < LEN) {
      if (k in O) {
        res[k] = callback.call(thisArg, O[k], k, O);
      }
      k++;
    }

    return res;
  };
}
