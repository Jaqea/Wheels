/**
 * 实现apply, ES6写法
 * @param context - 新的this指向对象
 * @param arr - 数组/类数组
 */
function initMyApplyES6(context, arr) {
  Function.prototype.myApplyES6 = function () {
    if (typeof this !== "function") {
      throw new Error("xxx");
    }

    context = context ? Object(context) : window;
    const symbolKey = Symbol();
    context[symbolKey] = this;

    let result;
    if (arr && arr.length) {
      result = context[symbolKey](...arr);
    } else {
      result = context[symbolKey]();
    }

    delete context[symbolKey];

    return result;
  };
}

/**
 * 实现apply, ES3写法
 * @param context - 新的this指向对象
 * @param arr - 数组/类数组
 */
function initMyApplyES3(context, arr) {
  Function.prototype.myApplyES3 = function () {
    if (typeof this !== "function") {
      throw new Error("xxx");
    }

    context = context ? Object(context) : window;
    context.fn = this;

    var result;
    if (arr && arr.length) {
      var args = [];
      for (var i = 0; i < arr.length; i++) {
        args.push("arr[" + i + "]");
      }
      result = eval("context.fn(" + args + ")");
    } else {
      result = context.fn();
    }

    delete context.fn;

    return result;
  };
}
