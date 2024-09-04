const data = {
  name: "Yimwu",
  id: 1,
  information: {
    tel: "135xxxxx354",
    email: "15xxxxx@xx.com",
  },
};

let activeEffect;

function effect(fnc) {
  activeEffect = fnc;
  fnc();
}

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return Reflect.get(target, key);
  },
  set(target, key, newValue) {
    trigger(target, key);
    Reflect.set(target, key, newValue);
  },
});

const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);

  if (!depsMap) {
    return;
  }

  const effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
}
