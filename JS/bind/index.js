/**
 * 实现bind, ES6写法
 * @param context - 新的this指向对象
 */
function initMyBindES6(context) {
  Function.prototype.myBindES6 = function () {
    if (typeof this !== "function") {
      throw new Error("xxx");
    }

    context = context ? Object(context) : window;
    const args = [...arguments].slice(1);
    const self = this;
    const fNOP = function () {};

    const fBound = function () {
      const bindArgs = [...args, ...arguments];
      return self.apply(this instanceof fNOP ? this : context, bindArgs);
    };

    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/**
 * 实现bind, ES3写法
 * @param context - 新的this指向对象
 */
function initMyBindES3(context) {
  Function.prototype.myBindES3 = function () {
    if (typeof this !== "function") {
      throw new Error("xxx");
    }

    context = context ? Object(context) : window;
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    var fNOP = function () {};
    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(
        this instanceof fNOP ? this : context,
        args.concat(bindArgs)
      );
    };

    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
