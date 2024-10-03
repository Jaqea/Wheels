/**
 * 数组reduce方法实现
 *
 */
function initMyReduce() {
  Array.prototype.myReduce = function (fn, initValue) {
    let i = 0,
      result = initValue;

    if (typeof result === "undefined") {
      result = this[i++];
    }

    while (i < this.length) {
      result = fn(result, this[i], i, this);
      i++;
    }

    return result;
  };
}
