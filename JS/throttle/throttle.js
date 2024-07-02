let count = 0;

const ndContainer = document.getElementById("js-container");
const ndBtn = document.getElementById("js-cancel");

const setCount = function () {
  ndContainer.innerHTML = ++count;
};

// function throllte(func, wait) {
//   let previous = 0;

//   return function () {
//     const now = +new Date();
//     if (now - previous >= wait) {
//       previous = +new Date();
//       func.apply(this, arguments);
//     }
//   };
// }

// function throllte(func, wait) {
//   let timer;

//   return function () {
//     if (!timer) {
//       timer = setTimeout(() => {
//         func.apply(this, arguments);
//         clearTimeout(timer);
//         timer = null;
//       }, wait);
//     }
//   };
// }

// function throllte(func, wait) {
//   let previous = 0,
//     timer;

//   return function () {
//     const now = +new Date();
//     const remaining = wait - (now - previous);
//     if (remaining <= 0 || remaining > wait) {
//       if (timer) {
//         clearTimeout(timer);
//         timer = null;
//       }
//       previous = now;
//       func.apply(this, arguments);
//     } else if (!timer) {
//       timer = setTimeout(() => {
//         previous = +new Date();
//         func.apply(this, arguments);
//         timer = null;
//       }, wait);
//     }
//   };
// }

function throllte(func, waitTime, options = {}) {
  let context, args, timeoutId, result;
  previous = 0;
  if (!options) options = {};

  const later = function () {
    previous = options.leading ? +new Date() : 0;
    result = func.apply(context, args);
    timeoutId = null;
    if (timeoutId) context = args = null;
  };

  const throttled = function () {
    const now = +new Date();
    if (!previous && !options.leading) previous = now;
    const remaining = waitTime - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > waitTime) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      previous = now;
      result = func.apply(context, args);

      if (!timeoutId) {
        context = args = null;
      }
    } else if (!timeoutId && options.trailing) {
      timeoutId = setTimeout(later, waitTime);
    }

    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = null;
    previous = 0;
  };

  return throttled;
}

const setCountAction = throllte(setCount, 2000, {
  leading: true,
  trailing: false,
});

ndContainer.addEventListener("mousemove", setCountAction);
ndBtn.addEventListener("click", function () {
  setCountAction.cancel();
});
