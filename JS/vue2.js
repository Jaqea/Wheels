const data = {
  name: "Yimwu",
  id: 1,
  information: {
    tel: "135xxxxx354",
    email: "15xxxxx@xx.com",
  },
};

function update(oldValue, newValue) {
  console.log("触发更新!");
  console.log("旧值：", oldValue);
  console.log("新值：", newValue);
}

function defineReactive(target, key, value) {
  observe(value);
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      observe(newValue);
      if (value !== newValue) {
        update(value, newValue);
        value = newValue;
      }
    },
  });
}

const oldArrayProperty = Array.prototype;
const arrProperty = Object.create(oldArrayProperty);

const methods = ["push", "pop", "shift", "unshift", "splice"];

methods.forEach((method) => {
  arrProperty[method] = function () {
    update();
    Array.prototype[method].apply(this, arguments);
  };
});

function observe(target) {
  if (typeof target !== "object" || target == null) {
    return target;
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProperty;
    return;
  }

  for (const [k, v] of Object.entries(target)) {
    defineReactive(target, k, v);
  }
}

observe(data);
