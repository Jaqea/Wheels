let count = 0;

const ndContainer = document.getElementById("js-container");
const ndBtn = document.getElementById("js-cancel");
const setCount = function () {
  this.innerHTML = count++;
};
const debounce = function (func, waitTime, immediate) {
  let timoutId, result;

  const debounced = function () {
    const args = arguments;
    const context = this;

    if (timoutId) clearTimeout(timoutId);
    if (immediate) {
      const callNow = !timoutId;
      timoutId = setTimeout(() => {
        timoutId = null;
      }, waitTime);
      if (callNow) result = func.apply(context, args);
    } else {
      timoutId = setTimeout(function () {
        func.apply(context, args);
      }, waitTime);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timoutId);
    timoutId = null;
  };

  return debounced;
};

const setCountAction = debounce(setCount, 500, true);

ndContainer.addEventListener("mousemove", setCountAction);
ndBtn.addEventListener("click", function () {
  setCountAction.cancel();
});
