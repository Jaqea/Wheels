const pre = [1, 2, 3, 4, 5, 6];
const ino = [3, 2, 4, 1, 6, 5];
// 3, 4, 2, 6, 5, 1

//     1
//   2   5
//  3 4 6

const res = [];
function post(pre, ino) {
  if (!pre.length) {
    return;
  }

  const root = pre[0];

  if (pre.length > 1) {
    let deleteIndex;
    for (deleteIndex = 0; deleteIndex < ino.length; deleteIndex++) {
      if (ino[deleteIndex] === root) {
        break;
      }
    }

    const inoLeft = ino.slice(0, deleteIndex);
    const inoRight = ino.slice(deleteIndex + 1);

    const preLeft = pre.slice(1, inoLeft.length + 1);
    const preRight = pre.slice(inoLeft.length + 1);

    post(preLeft, inoLeft);
    post(preRight, inoRight);
  }

  res.push(root);
}

post(pre, ino);
console.log(res);

function sleep(waitTime) {
  return function (value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve(value);
      }, waitTime);
    });
  };
}

const asyncActions = [sleep(1000), sleep(1000), sleep(1000)];

// asyncActions.reduce((p, cur) => {
//   return new Promise((resolve) => {
//     p.then((value) => {
//       cur(value + 1).then(resolve);
//     });
//   });
// }, Promise.resolve(0));

// let value = 0;
// function co(asyncs) {
//   const cur = asyncs.shift();
//   cur(value).then((res) => {
//     value = res + 1;
//     if (asyncs.length) {
//       co(asyncs);
//     }
//   });
// }

// co(asyncActions);

function* gen(result) {
  for (let i = 0; i < asyncActions.length; i++) {
    result = yield asyncActions[i](result);
  }
}

function co() {
  const g = gen(1);
  function next(data) {
    const result = g.next(data);
    if (result.done) {
      return result.value;
    } else {
      result.value.then((res) => {
        next(res + 1);
      });
    }
  }

  next(1);
}

co();

// function co() {
//   const g = gen(1);

//   function next(res) {
//     const result = g.next(res);
//     if (!result.done) {
//       result.value.then((res) => {
//         next(res + 1);
//       });
//     } else {
//       return result.value;
//     }
//   }

//   next(1);
// }

// co();

// async function asCo(result) {
//   for (let i = 0; i < asyncActions.length; i++) {
//     result = await asyncActions[i](result + 1);
//   }
// }

// asCo(0);

function createAdd() {
  let sum = 0;

  const add = function () {
    const args = [...arguments];
    const output = function () {
      return sum;
    };

    args.forEach((item) => {
      sum += item;
    });

    return {
      add,
      output,
    };
  };

  return add;
}

const add = createAdd();
add(1, 2).add(3).add(4).output();

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

const bubbleSort = (arr) => {
  const LEN = arr.length;
  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < LEN - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

function flat(arr, deep = 1) {
  return deep > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? flat(cur, deep - 1) : cur),
        []
      )
    : arr.slice();
}

function removeRepeat(arr) {
  // return [...new Set(...arr)];
  // return Array.from(new Set(arr))
}

Array.prototype.myReduce0 = function (fnc, initValue) {
  let i = 0,
    result = initValue;

  if (typeof result === "undefined") {
    result = this[i++];
  }

  while (i < this.length) {
    result = fnc(result, this[i], i, this);
    i++;
  }

  return result;
};

Array.prototype.myReduce = function (fnc, initValue) {
  let result = initValue,
    i = 0;

  if (typeof result === "undefined") {
    result = this[i++];
  }

  while (i < this.length) {
    result = fnc(result, this[i++]);
  }

  return result;
};

function sleep(waitTime) {
  return function (value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(value);
        resolve(value);
      }, waitTime);
    });
  };
}

const promises = [sleep(1000), sleep(1000), sleep(1000)];

function pipe(promises) {
  return new Promise((resolve, reject) => {
    const result = [];

    // function run(value) {
    //   const p = promises.shift();
    //   p(value).then((res) => {
    //     result.push(res);
    //     if (promises.length) {
    //       run(res);
    //     } else {
    //       resolve(result);
    //     }
    //   }, reject);
    // }

    // run(0);

    function* gen(result) {
      for (let p of promises) {
        result = yield p(result);
      }
    }

    function co() {
      const g = gen(0);

      function next(param) {
        const data = g.next(param);
        if (!data.done) {
          data.value.then((res) => {
            result.push(res);
            next(res);
          }, reject);
        } else {
          resolve(result);
        }
      }

      next(0);
    }

    co();
  });
}

pipe(promises);

function TreeNode(val, left, right) {
  this.val = val ? val : 0;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

function createTree(arr) {
  const queue = [],
    root = new TreeNode(arr.shift());
  queue.push(root);

  while (queue.length) {
    const node = queue.shift();
    const leftVal = arr.shift();
    const rightVal = arr.shift();
    if (leftVal) {
      node.left = new TreeNode(leftVal);
      queue.push(node.left);
    }
    if (rightVal) {
      node.right = new TreeNode(rightVal);
      queue.push(node.right);
    }
  }

  return root;
}

function createStorage(key, value) {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  function set(key, value, expire = DEFAULT_CACHE_TIME) {
    const storageData = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    };

    const json = JSON.stringify(storageData);
    localStorage.setItem(key, json);
  }

  function get(key) {
    const json = localStorage.getItem(key);
    if (json) {
      const storageData = JSON.parse(json);
      const { value, expire } = storageData;

      if (expire === null || expire >= Date.now()) {
        return value;
      }

      remove(key);
      return null;
    }

    return null;
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function clear() {
    localStorage.clear();
  }

  return {
    get,
    set,
    remove,
    clear,
  };
}
