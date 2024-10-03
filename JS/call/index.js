/**
 * 实现call, ES6写法
 * @param context - 新的this指向对象
 */
function initMyCallES6() {
  Function.prototype.myCallES6 = function (context) {
    if (typeof this !== "function") {
      return new Error("xxx");
    }

    context = context ? Object(context) : window;
    const symbolKey = Symbol();
    context[symbolKey] = this;

    const args = [...arguments].slice(1);
    const result = context[symbolKey](...args);

    delete context[symbolKey];

    return result;
  };
}

/**
 * 实现call, ES3写法
 * @param context - 新的this指向对象
 */
function initMyCallES3() {
  Function.prototype.myCallES3 = function (context) {
    if (typeof this !== "function") {
      throw new Error("xxx");
    }

    context = context ? Object(context) : window;
    context.fn = this;

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push("arguments[" + i + "]");
    }

    var result = eval("context.fn(" + args + ")");

    delete context.fn;

    return result;
  };
}
