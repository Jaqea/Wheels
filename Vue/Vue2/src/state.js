import { observe } from "./observer";

function initState(vm) {
  const opts = vm.$options;

  if (opts.props) {
    initPrpos(vm);
  }
  if (opts.method) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch();
  }
}

function initPrpos(vm) {}

function initMethod(vm) {}

function initData(vm) {
  let data = vm.$options.data;

  data = vm._data = typeof data === "function" ? data() : data || {};

  for (let key in data) {
    proxy(vm, "_data", key);
  }

  observe(data);
}

function initComputed(vm) {}

function initWatch(vm) {}

/**
 * 数据代理
 */
function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key];
    },
    set(newValue) {
      object[sourceKey][key] = newValue;
    },
  });
}

export { initState };
