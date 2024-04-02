let count = 0;

const ndContainer = document.getElementById("js-container");
const ndBtn = document.getElementById("js-cancel");
const setCount = function () {
  this.innerHTML = count++;
};
const debounce = function (func, waitTime, immediate) {
  let timoutId, result;

  arguments.callee.cancel = () => {
    clearTimeout(timoutId);
    timoutId = null;
  };

  return function () {
    if (timoutId) clearTimeout(timoutId);
    if (immediate) {
      const callNow = !timoutId;
      timoutId = setTimeout(() => {
        timoutId = null;
      }, waitTime);
      if (callNow) result = func.apply(this, arguments);
    } else {
      timoutId = setTimeout(() => {
        func.apply(this, arguments);
      }, waitTime);
    }
    return result;
  };
};

ndContainer.addEventListener("mousemove", debounce(setCount, 500, true));
ndBtn.addEventListener("click", debounce.cancel);
