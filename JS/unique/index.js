/**
 * 数组去重ES6写法
 * @param arr - 需要去重的数组
 */
function uniqueES6(arr) {
  return [...new Set(arr)];
}

/**
 * 数组去重ES5写法
 * @param  arr
 */
function uniqueES5(arr) {
  /**
   * 方法一
   */
  const firstMethod = function () {
    const map = {};
    const newArr = [];

    arr.forEach((item) => {
      if (!map[item]) {
        map[item] = 1;
        newArr.push(item);
      }
    });

    return newArr;
  };

  /**
   * 方法二
   */
  const secondMethod = function () {
    return arr.filter((item, index, array) => {
      return array.indexOf(item) === index;
    });
  };

  return {
    firstMethod,
    secondMethod,
  };
}
