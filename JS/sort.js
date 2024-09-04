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

const quickSort = (arr) => {
  const sort = (low, high) => {
    if (low >= high) {
      return;
    }

    const compareValue = arr[low];
    let left = low,
      right = high;
    while (left < right) {
      while (arr[right] >= compareValue && left < right) {
        right--;
      }

      if (left < right) {
        arr[left] = arr[right];
        left++;
      }

      while (arr[left] <= compareValue && left < right) {
        left++;
      }

      if (left < right) {
        arr[right] = arr[left];
        right--;
      }
    }

    arr[left] = compareValue;
    sort(low, left - 1);
    sort(left + 1, high);
  };

  sort(0, arr.length - 1);

  return arr;
};

const shellSort = (arr) => {
  const LEN = arr.length;

  for (let gap = Math.floor(LEN / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = 0; i < LEN - gap; i++) {
      let j = i;
      const x = arr[j];
      while (j + gap < LEN && x > arr[j + gap]) {
        arr[j] = arr[j + gap];
        j = j + gap;
      }
      arr[j] = x;
    }
  }

  return arr;
};

const insertionSort = (arr) => {
  const LEN = arr.length;

  for (let i = 1; i < LEN; i++) {
    const x = arr[i];
    let j = i;
    while (j > 0 && x < arr[j - 1]) {
      arr[j] = arr[j - 1];
      --j;
    }

    arr[j] = x;
  }

  return arr;
};

const selectionSort = (arr) => {
  const LEN = arr.length;

  for (let i = 0; i < LEN; i++) {
    let minIndex = i;
    for (let j = i; j < LEN; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
};

const mergeSort = (arr) => {
  const merge = (leftArr, rightArr) => {
    const mergeArr = [],
      LEFTLEN = leftArr.length,
      RIGHTLEN = rightArr.length;
    let left = (right = 0);

    while (left < LEFTLEN && right < RIGHTLEN) {
      if (leftArr[left] < rightArr[right]) {
        mergeArr.push(leftArr[left]);
        left++;
      }

      if (rightArr[right] < leftArr[left]) {
        mergeArr.push(rightArr[right]);
        right++;
      }
    }

    while (right < RIGHTLEN) {
      mergeArr.push(rightArr[right++]);
    }

    while (left < LEFTLEN) {
      mergeArr.push(leftArr[left++]);
    }

    return mergeArr;
  };

  const sort = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      const leftArr = sort(left, mid);
      const rightArr = sort(mid + 1, right);
      return merge(leftArr, rightArr);
    }

    return [arr[left]];
  };

  return sort(0, arr.length - 1);
};

const countingSort = (arr) => {
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;

  arr.forEach((item) => {
    min = min < item ? min : item;
    max = max > item ? max : item;
  });

  const offset = min < 0 ? -min : 0;

  const countingArr = new Array(max + offset + 1).fill(0),
    result = [];

  arr.forEach((item) => {
    countingArr[item + offset]++;
  });

  countingArr.forEach((value, index) => {
    while (value) {
      result.push(index - offset);
      value--;
    }
  });

  return result;
};

const heapSort = (arr) => {
  const LEN = arr.length;

  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const buildHeap = (i, len) => {
    for (
      let maxIndex = 2 * i + 1;
      maxIndex + 1 < len;
      maxIndex = 2 * maxIndex + 1
    ) {
      if (arr[maxIndex] < arr[maxIndex + 1]) {
        maxIndex++;
      }

      if (arr[i] < arr[maxIndex]) {
        swap(i, maxIndex);
        buildHeap(maxIndex, len);
      }
    }
  };

  for (let i = Math.floor(LEN / 2) - 1; i >= 0; i--) {
    buildHeap(i, LEN);
  }

  for (let i = LEN - 1; i >= 0; i--) {
    swap(0, i);
    buildHeap(0, i);
  }

  return arr;
};

const bucketSort = (arr, size = 10) => {
  const min = Math.min(...arr),
    max = Math.max(...arr);

  const buketRange = (max - min + 1) / size;
  const bukets = new Array(size).fill().map(() => []);

  let result = [];

  arr.forEach((item) => {
    const index = Math.floor((item - min) / buketRange);
    const buket = bukets[index];
    const LEN = buket.length;

    if (LEN) {
      let i = LEN - 1;
      while (i >= 0 && buket[i] > item) {
        buket[i + 1] = buket[i];
        --i;
      }
      buket[i + 1] = item;
    } else {
      buket.push(item);
    }
  });

  bukets.forEach((buket) => {
    result = result.concat(buket);
  });

  return result;
};

const radixSort = (arr) => {
  const max = Math.max(...arr);
  const len = String(max).length;

  for (let i = 0; i < len; i++) {
    const bukets = new Array(10).fill().map(() => []);

    for (let j = 0; j < arr.length; j++) {
      const index = (arr[j] / 10 ** i) % 10;
      bukets[index].push(arr[j]);
    }

    const res = [];
    bukets.forEach((buket) => {
      buket.forEach((item) => {
        res.push(item);
      });
    });

    arr = res;
  }

  return arr;
};
